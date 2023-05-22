import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



import { myHolidayContext } from './HolidayContext';
import data from './Data.json';

//compontents
import Header from './components/Header';
import PlaneBackground from './components/PlaneBackground';
import Holidays from './components/Holidays';
import HolidayChoice from './components/HolidayChoice';
import Contact from './components/Contact';
import Loader from './components/Loader';
import Reviews from './components/Reviews';
import About from './components/About';


export type Data = {
  id: number;
  name: string;
  price: string;
  picture: string;
  description: string;
  seeMore: boolean;
}[];



const App: React.FC = () => {


  const [loading, setLoading] = useState<boolean>(false);

  //select logic 
  const [selectValue, setSelectValue] = useState<string>("");
  const [searchDestination, setSearchDestination] = useState<string>("");
  const [searchBoolean, setSearchBoolean] = useState<boolean>(false);

  //holiday choice
  const [holidayChoice, setHolidayChoice] = useState<Data>([]);


  //qty customers
  const [customers, setCustomers] = useState([
    { id: 1, 'category': 'Adults', qty: 1 },
    { id: 2, 'category': 'Children', qty: 0 },
    { id: 3, 'category': 'Infants', qty: 0 },
  ])

  //total price shows in HolidayChoice.tsx I set the price when user clicks a holiday in useEffect then when user increments on HolidayChoice I set the total to be the price
  const [total, setTotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  //tenaray condition logic in Holiday.Tsx
  const [paymentPage, setPaymentPage] = useState<boolean>(false);

  //loading
  useEffect(() => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000)

  }, [])

  //when user either selects a holiday from input or clicks one from the page this will fire
  useEffect(() => {


    const desination = data.map(holiday => {
      if (holiday.name === searchDestination) {
        setHolidayChoice([holiday])
        window.scrollTo(0, 0);
        const holidayPrice = parseInt(holiday.price)
        setPrice(holidayPrice);
        setTotal(holidayPrice);
      }
    })
  }, [searchDestination, searchBoolean]);


  //select and also  when user clicks a holiday functionality this will bring up the holiday on its own when user picks a holiday
  const clickedHoliday = (holiday: string): void => {


    setSearchDestination(holiday);
    setSearchBoolean(true);


  }

  const close = () => {
    setTotal(0);
    setPrice(0);
    setCustomers([
      { id: 1, 'category': 'Adults', qty: 1 },
      { id: 2, 'category': 'Children', qty: 0 },
      { id: 3, 'category': 'Infants', qty: 0 },
    ])
    setSearchBoolean(false);
    setPaymentPage(false);
  }

  //will user scrolls top deals it will scroll to smoothly to that section with this ref and the function pagePart
  const holidayRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const arrowUpRef = useRef<HTMLDivElement | null>(null);


  const pagePart = (part: string): void => {

    close()
    setSelectValue("Where would you like to go...?");
    if (holidayRef.current && part === 'holidays') {

      holidayRef.current.scrollIntoView({ behavior: "smooth" });

    }
    else if (contactRef.current && part === 'contact') {

      contactRef.current.scrollIntoView({ behavior: "smooth" });

    }
    else if (aboutRef.current && part === 'about') {

      aboutRef.current.scrollIntoView({ behavior: "smooth" });

    }
    else if (reviewRef.current && part === 'review') {

      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (arrowUpRef.current && part === 'top of page') {

      arrowUpRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }


  //control of the select input in file Search.tsx
  const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>): void => {

    setSelectValue(e.target.value);

    if (e.target.value !== "Where would you like to go...?") {

      clickedHoliday(e.target.value);

    } else {
      setSearchBoolean(false);
    }
  }


  const incrementCustomer = (id: number): void => {

    const addCustomer = customers.map(customer => {

      if (customer.id === id && customer.category === 'Adults') {

        setTotal(prev => prev + price);
        return { ...customer, qty: customer.qty + 1 };

      }
      else if (customer.id === id && customer.category === 'Children') {
        //children go half price logic
        setTotal(prev => prev + price / 2);
        return { ...customer, qty: customer.qty + 1 };
      }

      else if (customer.id === id && customer.category === 'Infants') {

        return { ...customer, qty: customer.qty + 1 };

      }

      else {

        return customer;

      }
    })
    setCustomers(addCustomer);


  }

  const decrementCustomer = (id: number) => {

    const minusCustomer = customers.map(customer => {

      if (customer.id === id && customer.qty > 1 && customer.category === 'Adults') {
        setTotal(prev => prev - price);
        return { ...customer, qty: customer.qty - 1 };

      }

      else if (customer.id === id && customer.qty > 0 && customer.category === 'Children') {
        setTotal(prev => prev - price / 2);
        return { ...customer, qty: customer.qty - 1 };

      } else if (customer.id === id && customer.qty > 0 && customer.category === 'Infants') {

        return { ...customer, qty: customer.qty - 1 };

      }
      else {

        return customer;
      }
    })
    setCustomers(minusCustomer);
  }


  //payment page boolean when  customer clicks proceed in HolidayChoice
  const payPage = () => {
    setPaymentPage(true);
  }

  return (
    <div className="App">
      {loading === false ? (
        <myHolidayContext.Provider value={data as Data}>
          <Header pagePart={pagePart} arrowUpRef={arrowUpRef} />
          {searchBoolean === false ?
            <>
              <PlaneBackground selectValue={selectValue} handleSelectInput={handleSelectInput} />
              <Holidays holidayRef={holidayRef} clickedHoliday={clickedHoliday} />
              <Reviews reviewRef={reviewRef} />
              <About aboutRef={aboutRef} />
              <Contact contactRef={contactRef} />
            </>
            :
            <>
              <HolidayChoice holidayChoice={holidayChoice} customers={customers} incrementCustomer={incrementCustomer}
                decrementCustomer={decrementCustomer} total={total} close={close} paymentPage={paymentPage} payPage={payPage} />
            </>}

        </myHolidayContext.Provider>
      ) :
        <Loader />}
    </div>
  );
}

export default App;
