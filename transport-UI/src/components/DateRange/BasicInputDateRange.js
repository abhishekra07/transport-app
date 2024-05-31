import React, { useState } from "react";
import "./basicInputDateRange.css"; // Importing CSS styles for the component
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns"; // Importing date manipulation functions from date-fns library
import DatePicker from "react-datepicker"; // Importing date picker component from react-datepicker library
import "react-datepicker/dist/react-datepicker.css"; // Importing CSS styles for the date picker component

/**
 * Component: BasicInputDateRange
 * Description: This component provides a user interface for selecting date ranges with preset options like today, this week, this month, etc.
 */
function BasicInputDateRange() {
  // State variables to manage start and end dates of the selected range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle changes in the start date selection
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Function to handle changes in the end date selection
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Function to handle click event for selecting the current week
  const handleThisWeekClick = () => {
    setStartDate(startOfWeek(new Date())); // Set start date to the beginning of the current week
    setEndDate(endOfWeek(new Date())); // Set end date to the end of the current week
  };

  // Function to handle click event for selecting the current month
  const handleThisMonthClick = () => {
    setStartDate(startOfMonth(new Date())); // Set start date to the beginning of the current month
    setEndDate(endOfMonth(new Date())); // Set end date to the end of the current month
  };

  // Function to handle click event for selecting the current day
  const handleTodayClick = () => {
    const today = new Date();
    setStartDate(today); // Set start date to the current day
    setEndDate(today); // Set end date to the current day
  };

  // Function to handle click event for selecting a range of three consecutive days starting from today
  const handleThreeDaysClick = () => {
    const today = new Date();
    setStartDate(today); // Set start date to the current day
    setEndDate(addDays(today, 2)); // Set end date to three days from the current day
  };

  // Function to handle click event for clearing the selected date range
  const handleClearClick = () => {
    setStartDate(null); // Reset start date to null
    setEndDate(null); // Reset end date to null
  };

  // Rendering the component UI
  return (
    <div className="date-container">
      <div className="date-range-picker">
        {/* Start Date Input */}
        <div className="start-date">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Set minimum selectable date to the current date
            selected={startDate}
            onChange={(date) => handleStartDateChange(date)}
          />
        </div>

        {/* End Date Input */}
        <div className="end-date">
          <label htmlFor="end-date">End Date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Set minimum selectable date to the current date
            selected={endDate}
            onChange={(date) => handleEndDateChange(date)}
          />
        </div>
      </div>

      {/* Preset Date Range Buttons */}
      <div className="date-presets">
        <button className="tag" onClick={handleTodayClick}>
          Today
        </button>
        <button className="tag" onClick={handleThreeDaysClick}>
          3 Days
        </button>
        <button className="tag" onClick={handleThisWeekClick}>
          This Week
        </button>
        <button className="tag" onClick={handleThisMonthClick}>
          This Month
        </button>
        <button className="clear-tag" onClick={handleClearClick}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default BasicInputDateRange;
