"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Calendar, Clock, MapPin, Users, ArrowRight, ArrowLeft, 
  ShieldCheck, Loader2, CheckCircle2, ChevronLeft, ChevronRight, Download
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfToday } from "date-fns";
import { Service, Workshop } from '@/types';
import { createBooking } from '@/actions/bookings/createBooking';
import Link from 'next/link';

interface BookingFlowProps {
  services: Service[];
  workshops: Workshop[];
  defaultServiceId?: string;
  defaultWorkshopId?: string;
  isCanceled?: boolean;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingFlow({ services, workshops, defaultServiceId, defaultWorkshopId, isCanceled }: BookingFlowProps) {
  // ----------------------------------------------------
  // State variables
  // ----------------------------------------------------
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedItem, setSelectedItem] = useState<Service | Workshop | null>(null);
  const [selectedType, setSelectedType] = useState<'Service' | 'Workshop' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);

  const today = useMemo(() => startOfToday(), []);

  // ----------------------------------------------------
  // Pre-selection from query params
  // ----------------------------------------------------
  useEffect(() => {
    if (defaultServiceId) {
      const match = services.find(s => s.id === defaultServiceId || s.name?.toLowerCase().replace(/\s+/g, '-') === defaultServiceId || s.title?.toLowerCase().replace(/\s+/g, '-') === defaultServiceId);
      if (match) {
        setSelectedItem(match);
        setSelectedType('Service');
        setStep(2);
      }
    } else if (defaultWorkshopId) {
      const match = workshops.find(w => w.id === defaultWorkshopId);
      if (match) {
        setSelectedItem(match);
        setSelectedType('Workshop');
        setStep(2);
      }
    }
  }, [defaultServiceId, defaultWorkshopId, services, workshops]);

  // Reset date/time selection if service changes
  const handleItemSelect = (item: Service | Workshop, type: 'Service' | 'Workshop') => {
    setSelectedItem(item);
    setSelectedType(type);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(2);
  };

  // Group services
  const privateServices = useMemo(() => {
    return services.filter(s => ![
      "fa111111-1111-1111-1111-111111111111", // Friday Unwind
      "da222222-2222-2222-2222-222222222222", // Saturday Reset
      "ea333333-3333-3333-3333-333333333333"  // Sunday Restoration
    ].includes(s.id));
  }, [services]);

  const weekendServices = useMemo(() => {
    return services.filter(s => [
      "fa111111-1111-1111-1111-111111111111",
      "da222222-2222-2222-2222-222222222222",
      "ea333333-3333-3333-3333-333333333333"
    ].includes(s.id));
  }, [services]);

  // ----------------------------------------------------
  // Date Picker restriction rules
  // ----------------------------------------------------
  const isDateDisabled = useCallback((date: Date) => {
    if (isBefore(date, today)) return true;

    if (!selectedItem || !selectedType) return false;

    // Workshops: only allow the workshop date
    if (selectedType === 'Workshop') {
      const workshopDate = new Date((selectedItem as Workshop).date);
      return !isSameDay(date, workshopDate);
    }

    // Weekend sessions: enforce specific day of week
    const serviceId = selectedItem.id;
    const dayOfWeek = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

    if (serviceId === "fa111111-1111-1111-1111-111111111111") {
      return dayOfWeek !== 5; // Friday only
    }
    if (serviceId === "da222222-2222-2222-2222-222222222222") {
      return dayOfWeek !== 6; // Saturday only
    }
    if (serviceId === "ea333333-3333-3333-3333-333333333333") {
      return dayOfWeek !== 0; // Sunday only
    }

    return false; // Private sessions: any future day
  }, [selectedItem, selectedType, today]);

  // Available slots by session type
  const timeSlots = useMemo(() => {
    if (!selectedItem) return [];

    if (selectedType === 'Workshop') {
      return ["18:30"];
    }

    const id = selectedItem.id;
    if (id === "fa111111-1111-1111-1111-111111111111") {
      return ["18:00", "19:30"]; // Friday evening
    }
    if (id === "da222222-2222-2222-2222-222222222222") {
      return ["09:30", "11:00"]; // Saturday morning
    }
    if (id === "ea333333-3333-3333-3333-333333333333") {
      return ["14:00", "16:00"]; // Sunday afternoon
    }

    // Private sessions standard slots
    return ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  }, [selectedItem, selectedType]);

  // Generate Calendar Grid
  const calendarGrid = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const daysInRow = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isDisabled = !isSameMonth(currentDay, monthStart) || isDateDisabled(currentDay);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);

        daysInRow.push({
          date: currentDay,
          isDisabled,
          isSelected,
          formatted: format(currentDay, "d")
        });
        day = addDays(day, 1);
      }
      rows.push(daysInRow);
    }
    return { rows, monthStart };
  }, [currentMonth, selectedDate, isDateDisabled]);

  // ----------------------------------------------------
  // Form Validation and submission
  // ----------------------------------------------------
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedItem || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setBookingResult(null);

    const combinedDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    combinedDate.setHours(hours, minutes);

    const formDataToSubmit = new FormData();
    if (selectedType === 'Service') {
      formDataToSubmit.append('service_id', selectedItem.id);
    } else {
      formDataToSubmit.append('workshop_id', selectedItem.id);
    }
    formDataToSubmit.append('full_name', `${formData.firstName} ${formData.lastName}`);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('session_date', combinedDate.toISOString());

    try {
      const result = await createBooking(formDataToSubmit);
      setBookingResult(result);
      if (result.success) {
        setStep(4);
      } else {
        setErrors({ submit: result.error || "Energy connection failed. Please try again." });
      }
    } catch (err) {
      console.warn(err);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // Calendar (.ics) generation
  // ----------------------------------------------------
  const handleDownloadICS = () => {
    if (!selectedItem || !selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);

    // Calculate end date based on duration
    const duration = 'duration_minutes' in selectedItem ? (selectedItem.duration_minutes || 60) : 120; // workshops: default 120m
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const title = selectedItem.title || ('name' in selectedItem ? (selectedItem as Service).name : '') || 'Session';
    const summary = `${title} - Heart Strong`;
    const description = `Booking for ${formData.firstName} ${formData.lastName}.\\nWhat to bring: Just yourself.`;
    const location = "Heart Strong Studio, Sanctuary Room";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Heart Strong//Booking Calendar//EN",
      "BEGIN:VEVENT",
      `UID:booking-${Date.now()}@heartstrong.com.au`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}-booking.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------------------------------------------
  // Progress bar rendering helper
  // ----------------------------------------------------
  const renderProgress = () => {
    const steps = [
      { num: 1, label: "Selection" },
      { num: 2, label: "Schedule" },
      { num: 3, label: "Details" },
      { num: 4, label: "Confirmation" }
    ];

    return (
      <div className="max-w-xl mx-auto mb-16 px-4">
        <div className="flex justify-between items-center relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-brand-teal/10 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-brand-gold -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          {steps.map((s) => {
            const isActive = step >= s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                    ${isCurrent ? "bg-brand-gold text-white scale-110 shadow-premium" : ""}
                    ${isActive && !isCurrent ? "bg-brand-teal text-white" : ""}
                    ${!isActive ? "bg-white text-brand-text/30 border border-brand-teal/10" : ""}
                  `}
                >
                  {s.num}
                </div>
                <span className={`text-[9px] uppercase font-bold tracking-widest mt-2 transition-colors duration-500 ${isActive ? "text-brand-text" : "text-brand-text/30"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-12 md:pt-16 pb-12 md:pb-16 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: "url('/lemuria-assets/backgrounds/beige-texture.jpg')", backgroundSize: 'cover' }}></div>
      
      {/* Ambient Glows */}
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-brand-gold/50"></div>
            <span className="text-[10px] font-bold text-brand-gold tracking-[0.4em] uppercase font-sans">Session Registration</span>
            <div className="w-12 h-[1px] bg-brand-gold/50"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-text">Portal of <span className="text-brand-teal italic font-light">Learning</span></h1>
        </div>

        {isCanceled && step === 1 && (
          <div className="bg-red-50/70 backdrop-blur-md border border-red-200/50 p-6 rounded-[30px] mb-8 text-red-600 italic text-sm flex items-center gap-5 shadow-sm max-w-2xl mx-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            The energy flow was interrupted. We are holding space for you to try again once your resonance aligns.
          </div>
        )}

        {/* Multi-step progress indicator */}
        {renderProgress()}

        {/* Step Content */}
        <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-premium border border-brand-teal/5 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <AnimatePresence mode="wait">
            
            {/* ---------------------------------------------------- */}
            {/* STEP 1: SERVICE SELECTION */}
            {/* ---------------------------------------------------- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-3xl font-serif text-brand-text mb-2">Select Your Session</h2>
                  <p className="text-sm text-brand-text/40 font-light">Choose a private modality, weekend group circle, or an upcoming immersion gathering.</p>
                </div>

                {/* Weekend Sessions Group */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold border-b border-brand-gold/15 pb-4">Weekend Circles (Group Sessions)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {weekendServices.map((s) => (
                      <div 
                        key={s.id} 
                        onClick={() => handleItemSelect(s, 'Service')}
                        className="group bg-brand-bg/30 p-8 rounded-[30px] border border-brand-teal/5 hover:border-brand-teal/20 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-bold bg-white px-3 py-1 rounded-full text-brand-teal uppercase tracking-widest shadow-sm">{s.duration_minutes}m</span>
                            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">${s.price}</span>
                          </div>
                          <h4 className="font-serif text-xl text-brand-text mb-2 group-hover:text-brand-teal transition-colors">{s.title || s.name}</h4>
                          <p className="text-xs text-brand-text/50 font-light leading-relaxed mb-6 line-clamp-3 italic">{s.description}</p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-brand-teal uppercase mt-auto group-hover:text-brand-gold transition-colors">
                          Select Resonance <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Private Harmonics Group */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-teal border-b border-brand-teal/15 pb-4">Private Harmonics (1-on-1 Sessions)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {privateServices.map((s) => (
                      <div 
                        key={s.id} 
                        onClick={() => handleItemSelect(s, 'Service')}
                        className="group bg-white p-6 md:p-8 rounded-[30px] border border-brand-teal/5 hover:border-brand-teal/20 shadow-sm hover:shadow-premium transition-all duration-300 text-left cursor-pointer flex justify-between items-center gap-6"
                      >
                        <div className="space-y-2 max-w-[80%]">
                          <div className="flex items-center gap-3">
                            <h4 className="font-serif text-lg md:text-xl text-brand-text group-hover:text-brand-teal transition-colors">{s.title || s.name}</h4>
                            <span className="text-[9px] font-bold text-white bg-brand-gold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{s.duration_minutes}m</span>
                          </div>
                          <p className="text-xs text-brand-text/40 font-light line-clamp-2">{s.description}</p>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-sm font-serif font-bold text-brand-text mb-2">${s.price}</span>
                          <ArrowRight className="w-5 h-5 text-brand-gold group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Immersions Group */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-text border-b border-brand-teal/15 pb-4">Upcoming Immersions (Gatherings)</h3>
                  <div className="space-y-4">
                    {workshops.map((w) => (
                      <div 
                        key={w.id} 
                        onClick={() => handleItemSelect(w, 'Workshop')}
                        className="group bg-[#1A362B] p-8 rounded-[35px] border border-white/5 hover:border-brand-gold/30 shadow-sm hover:shadow-premium transition-all duration-300 text-left cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="font-serif text-xl text-white group-hover:text-brand-gold transition-colors">{w.title}</h4>
                            <span className="text-[9px] font-bold text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-full uppercase tracking-widest bg-brand-gold/5">Workshop</span>
                          </div>
                          <p className="text-xs text-white/50 font-light leading-relaxed max-w-xl">{w.description}</p>
                        </div>
                        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0 shrink-0 gap-4">
                          <div className="flex flex-col sm:items-end">
                            <span className="text-brand-gold text-lg font-serif font-bold">${w.price}</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">
                              {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-brand-gold group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 2: DATE & TIME PICKER */}
            {/* ---------------------------------------------------- */}
            {step === 2 && selectedItem && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setStep(1)} 
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-text/50 uppercase tracking-widest hover:text-brand-teal transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Selection
                  </button>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-bg px-4 py-1.5 rounded-full">
                    {selectedItem.title || ('name' in selectedItem ? (selectedItem as Service).name : '') || 'Session'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Calendar Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-8 px-2">
                      <h3 className="font-serif text-2xl text-brand-text">
                        {format(calendarGrid.monthStart, "MMMM")} <span className="text-brand-teal italic font-light">{format(calendarGrid.monthStart, "yyyy")}</span>
                      </h3>
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                          className="w-10 h-10 rounded-full border border-brand-teal/10 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                          className="w-10 h-10 rounded-full border border-brand-teal/10 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 mb-4">
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day} className="text-center text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {calendarGrid.rows.map((row, rowIndex) => (
                        <div className="grid grid-cols-7 gap-2" key={rowIndex}>
                          {row.map((dayObj) => (
                            <div
                              key={dayObj.date.toString()}
                              onClick={() => !dayObj.isDisabled && setSelectedDate(dayObj.date)}
                              className={`
                                relative h-12 flex items-center justify-center text-sm transition-all rounded-2xl cursor-pointer
                                ${dayObj.isDisabled ? "text-brand-text/10 cursor-not-allowed" : "text-brand-text hover:bg-brand-teal/5"}
                                ${dayObj.isSelected ? "bg-brand-teal text-white shadow-premium scale-110 z-10" : ""}
                              `}
                            >
                              <span className={dayObj.isSelected ? "font-bold" : "font-light"}>
                                {dayObj.formatted}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="border-t md:border-t-0 md:border-l border-brand-teal/5 pt-8 md:pt-0 md:pl-12">
                    <div className="flex items-center gap-3 mb-8">
                      <Clock className="w-5 h-5 text-brand-gold" />
                      <h3 className="font-serif text-2xl text-brand-text">Available <span className="text-brand-teal italic font-light">Slots</span></h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {selectedDate ? (
                        timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`
                                h-12 rounded-2xl border text-sm tracking-widest transition-all
                                ${isSelected 
                                  ? "bg-brand-text text-white border-brand-text shadow-premium scale-[1.02]" 
                                  : "border-brand-teal/10 text-brand-text/60 hover:border-brand-teal hover:text-brand-teal"}
                              `}
                            >
                              {time}
                            </button>
                          );
                        })
                      ) : (
                        <div className="col-span-2 h-40 flex items-center justify-center text-brand-text/30 italic font-light text-center px-4 bg-brand-bg/20 rounded-3xl border border-brand-teal/5">
                          Select an open celestial date to view available time slots.
                        </div>
                      )}
                    </div>

                    {selectedDate && selectedTime && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-10 bg-brand-bg/50 rounded-3xl p-6 border border-brand-teal/5"
                      >
                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2">Selected Resonance</p>
                        <p className="text-brand-text font-serif text-lg">
                          {format(selectedDate, "EEEE, MMMM do")} at <span className="text-brand-teal italic">{selectedTime}</span>
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-brand-teal/5">
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-4 px-10 py-4.5 bg-brand-teal text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-premium hover:shadow-premiumHover transition-smooth hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Continue to Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 3: DETAILS FORM */}
            {/* ---------------------------------------------------- */}
            {step === 3 && selectedItem && selectedDate && selectedTime && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setStep(2)} 
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-text/50 uppercase tracking-widest hover:text-brand-teal transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Schedule
                  </button>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-bold text-white bg-brand-teal px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedItem.title || ('name' in selectedItem ? (selectedItem as Service).name : '') || 'Session'}
                    </span>
                    <span className="text-[9px] font-bold text-white bg-brand-gold px-3 py-1 rounded-full uppercase tracking-wider">
                      {format(selectedDate, "MMM d")} @ {selectedTime}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-8 max-w-2xl mx-auto">
                  {errors.submit && (
                    <div className="bg-red-50 text-red-700 p-5 rounded-[20px] border border-red-100 text-sm italic">
                      {errors.submit}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold ml-4">First Name</label>
                      <input 
                        id="firstName" 
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="First name"
                        disabled={isSubmitting} 
                        className="w-full h-14 rounded-full border border-brand-teal/10 bg-brand-bg/30 px-6 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 transition-smooth outline-none text-brand-text font-light"
                      />
                      {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold ml-4">Last Name</label>
                      <input 
                        id="lastName" 
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Last name"
                        disabled={isSubmitting} 
                        className="w-full h-14 rounded-full border border-brand-teal/10 bg-brand-bg/30 px-6 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 transition-smooth outline-none text-brand-text font-light"
                      />
                      {errors.lastName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold ml-4">Sacred Email</label>
                      <input 
                        id="email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@resonance.com"
                        disabled={isSubmitting} 
                        className="w-full h-14 rounded-full border border-brand-teal/10 bg-brand-bg/30 px-6 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 transition-smooth outline-none text-brand-text font-light"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{errors.email}</p>}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold ml-4">Phone Number (Optional)</label>
                      <input 
                        id="phone" 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="For session updates"
                        disabled={isSubmitting} 
                        className="w-full h-14 rounded-full border border-brand-teal/10 bg-brand-bg/30 px-6 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 transition-smooth outline-none text-brand-text font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold ml-4">{"Anything you'd like Jenny to know before your session?"}</label>
                    <textarea 
                      id="notes" 
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Share your intentions or physical considerations..."
                      disabled={isSubmitting} 
                      rows={4}
                      className="w-full rounded-[30px] border border-brand-teal/10 bg-brand-bg/30 p-6 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold/50 transition-smooth outline-none text-brand-text font-light resize-none"
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 bg-brand-teal text-white rounded-full font-bold text-[11px] tracking-[0.3em] uppercase shadow-premium hover:shadow-premiumHover transition-smooth hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Synchronizing Resonance...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-smooth" />
                          Register Booking
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 4: CONFIRMATION SCREEN */}
            {/* ---------------------------------------------------- */}
            {step === 4 && selectedItem && selectedDate && selectedTime && bookingResult && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12 max-w-2xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-premium animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-brand-text mb-2">Registration Confirmed</h2>
                  <p className="text-sm text-brand-text/50 font-light italic">Your session registration has been securely processed.</p>
                </div>

                {/* Summary Card */}
                <div className="bg-brand-bg/40 border border-brand-teal/5 p-8 md:p-12 rounded-[40px] shadow-inner space-y-6 text-left relative">
                  <h3 className="font-serif text-2xl text-brand-text border-b border-brand-teal/10 pb-4">
                    {selectedItem.title || ('name' in selectedItem ? (selectedItem as Service).name : '') || 'Session'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="flex gap-3 items-center">
                      <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="text-brand-text/80 text-sm font-light">
                        {format(selectedDate, "EEEE, MMMM do")}
                      </span>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                      <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="text-brand-text/80 text-sm font-light">
                        {selectedTime} ({'duration_minutes' in selectedItem ? (selectedItem.duration_minutes || 60) : 120} mins)
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="text-brand-text/80 text-sm font-light">
                        Heart Strong Studio, Sanctuary Room
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <Users className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="text-brand-text/80 text-sm font-light">
                        What to bring: Just yourself
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/80 p-6 rounded-2xl border border-brand-teal/5 text-xs text-brand-text/60 leading-relaxed font-light italic mt-6">
                    <strong>Note:</strong> Jenny will be in touch shortly to confirm your booking and align on your wellness goals.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                  {/* Add to Calendar */}
                  <button
                    onClick={handleDownloadICS}
                    className="inline-flex items-center justify-center gap-3 px-8 h-14 bg-white border border-brand-teal/15 text-brand-text rounded-full font-bold text-xs tracking-widest uppercase hover:bg-brand-bg/50 hover:border-brand-teal/30 transition-all active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4 text-brand-gold" /> Add to Calendar
                  </button>

                  {/* Proceed to Payment or Success finish */}
                  {bookingResult.url ? (
                    <a
                      href={bookingResult.url}
                      className="inline-flex items-center justify-center gap-3 px-10 h-14 bg-brand-teal text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-premium hover:bg-brand-text hover:-translate-y-1 transition-all active:scale-[0.98]"
                    >
                      Proceed to Exchange (Stripe) <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-3 px-10 h-14 bg-brand-teal text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-premium hover:bg-brand-text hover:-translate-y-1 transition-all active:scale-[0.98]"
                    >
                      Return to Sanctuary <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

         {/* Security badges */}
         <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-6 opacity-60 max-w-md mx-auto">
           <div className="flex items-center gap-3 text-brand-gold">
             <ShieldCheck className="w-5 h-5 animate-pulse" />
             <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Encrypted Session Protection</span>
           </div>
           <div className="hidden sm:block w-1.5 h-1.5 bg-brand-teal/20 rounded-full"></div>
           <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-brand-text/30">
             <span>AUD CURRENCY</span>
             <span className="w-1 h-1 bg-brand-teal/20 rounded-full"></span>
             <span>SECURE STRIPE</span>
           </div>
         </div>

      </div>
    </div>
  );
}
