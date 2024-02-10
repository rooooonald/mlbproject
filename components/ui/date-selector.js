import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./date-selector.module.css";

export default function DateSelector({ onSubmit, onCloseForm }) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  const dayInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (!router.query.gameDay) {
      const today = new Date();

      yearInputRef.current.value = today.getFullYear();
      monthInputRef.current.value =
        today.getMonth() + 1 > 9
          ? today.getMonth() + 1
          : `0${today.getMonth() + 1}`;
      dayInputRef.current.value =
        today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
      console.log(today.getDate());
      return;
    }

    const [prevSelectedYear, prevSelectedMonth, prevSelectedDay] =
      router.query.gameDay;

    yearInputRef.current.value = prevSelectedYear;
    monthInputRef.current.value = prevSelectedMonth;
    dayInputRef.current.value = prevSelectedDay;
  }, [router.query.gameDay]);

  function submitHandler(event) {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;
    const selectedDay = dayInputRef.current.value;

    const date = {
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
    };

    onSubmit(date);
  }

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      onClick={onCloseForm}
    >
      <label htmlFor="year">YEAR</label>
      <select id="year" ref={yearInputRef} onClick={(e) => e.stopPropagation()}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>

      <label htmlFor="month">MONTH</label>
      <select
        id="month"
        ref={monthInputRef}
        onClick={(e) => e.stopPropagation()}
      >
        <option value="01">JAN</option>
        <option value="02">FEB</option>
        <option value="03">MAR</option>
        <option value="04">APR</option>
        <option value="05">MAY</option>
        <option value="06">JUN</option>
        <option value="07">JUL</option>
        <option value="08">AUG</option>
        <option value="09">SEP</option>
        <option value="10">OCT</option>
        <option value="11">NOV</option>
        <option value="12">DEC</option>
      </select>

      <label htmlFor="day">DAY</label>
      <select id="day" ref={dayInputRef} onClick={(e) => e.stopPropagation()}>
        <option value="01">1</option>
        <option value="02">2</option>
        <option value="03">3</option>
        <option value="04">4</option>
        <option value="05">5</option>
        <option value="06">6</option>
        <option value="07">7</option>
        <option value="08">8</option>
        <option value="09">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>
      <button onClick={(e) => e.stopPropagation()}>SEARCH</button>
    </form>
  );
}
