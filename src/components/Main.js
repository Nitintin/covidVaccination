import React, { useState } from 'react';
import axios from 'axios';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpg';

function Main() {
    const [pincode, setPincode] = useState(121001);
    const [date, setdate] = useState('2021-05-01');
    const [fetchData, setfetchData] = useState({});
    const [isLoading, setisLoading] = useState(true);

    const fetchAPI = async () => {
        const DateExplode = date.split("-");
        const newDate = DateExplode[2] + "-" + DateExplode[1] + "-" + DateExplode[0];
        const result = await axios.get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=` + pincode + `&date=` + newDate + ``
        );
        setfetchData(result.data);
        setisLoading(false);
    }

    const showCenter = () => {
        const data = JSON.stringify(fetchData);
        if (isLoading) {
            return (" ")
        } else {
            if (data === "{}") {
                return (<h2>No Centers to display!</h2>);
            } else {
                console.log(data);
                return (
                    <table className="vaccinationCenter">
                        <tbody>
                            <tr>
                                <td>Center Name:</td>
                                {fetchData.centers.map(item => <td>{item.name}</td>)}
                            </tr>
                            <tr>
                                <td>State Name:</td>
                                {fetchData.centers.map(item => <td>{item.state_name}</td>)}
                            </tr>
                            <tr>
                                <td>District Name:</td>
                                {fetchData.centers.map(item => <td>{item.district_name}</td>)}
                            </tr>
                            <tr>
                                <td>Block Name:</td>
                                {fetchData.centers.map(item => <td>{item.block_name}</td>)}
                            </tr>
                            <tr>
                                <td>Timings (From):</td>
                                {fetchData.centers.map(item => <td>{item.from}</td>)}
                            </tr>
                            <tr>
                                <td>Timings (To):</td>
                                {fetchData.centers.map(item => <td>{item.to}</td>)}
                            </tr>
                            <tr>
                                <td>Fees Type :</td>
                                {fetchData.centers.map(item => <td>{item.fee_type}</td>)}
                            </tr>
                            <tr>
                                <td>Minimum Age Limit :</td>
                                {fetchData.centers.map(item => <td>{item.sessions[0].min_age_limit} years</td>)}
                            </tr>
                            <tr>
                                <td>Date : </td>
                                {fetchData.centers.map(item => <td>{item.sessions[0].date}</td>)}
                            </tr>
                        </tbody>
                    </table>
                );
            }
        }

    }

    return (
    <>
        <div class="container">
            <section class="col-md-12 content" id="home">
                <div class="col-lg-6 col-md-6 content-item tm-black-translucent-bg tm-logo-box">
                    <i class="fa fa-snowflake-o fa-5x tm-logo"></i>
                    <h1 class="text-uppercase">India Vaccination 2021</h1>
                </div>
                <div class="col-lg-6 col-md-6 content-item content-item-1 background tm-white-translucent-bg">
                    <h2 class="main-title text-center dark-blue-text">Welcome</h2>
                    <p>Indian Government has started mass vaccination programm for PAN india starting from MAY 1. Using this portal
                    you can check all the deatils of any vaccination centers using just the area pincode and date. Feel free to
                    share this with all.</p>
                </div>
            </section>

            <section class="col-md-12 content padding tm-equal-col-container" id="services">
                <div class="col-lg-6 col-md-6 col-sm-12 content-item tm-black-translucent-bg tm-services-section-padding searchFields">
                    <h2 class="main-title text-center dark-blue-text">Search Center</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td className="inputHeading">Enter PinCode :</td>
                                <td> 
                                    <input type="number" min ="100000" max="1000000" value={pincode} onChange={(e)=>setPincode(e.target.value)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td className="inputHeading">Enter Date :</td>
                                <td> 
                                    <input type="date" value={date} onChange={(e)=>setdate(e.target.value)} required/>
                                </td>
                            </tr>
                        </tbody>
                    </table><br/>
                    <button onClick={()=>fetchAPI()}>Click to view centers below</button>
                </div>
                <div class="col-lg-6 col-md-6 content-item content-item-1 background tm-white-translucent-bg">
                    {/* <div class="tm-left-col">
                        <div class="tm-border-box tm-gray-border-br tm-img-box-1">
                            <img src={img1} alt="vaccination 1" class="tm-img tm-img-tl"/>
                        </div>
                        <div class="tm-border-box tm-pink-border-bl tm-img-box-2">
                            <img src={img3} alt="vaccination 3" class="tm-img tm-img-bl"/>
                        </div>
                    </div>

                    <div class="tm-right-col">
                        <div class="tm-border-box tm-pink-border-tr tm-img-box-3">
                            <img src={img2} alt="vaccination 2" class="tm-img tm-img-tr"/>
                        </div>
                        <div class="tm-border-box tm-gray-border-tl tm-img-box-4">
                            <img src={img4} alt="vaccination 4" class="tm-img tm-img-br"/>
                        </div>
                    </div> */}
                    <h2 class="main-title text-center dark-blue-text">Disclaimer</h2>
                    <p>All the data displayed below is being dynamically fetched from governments official website. Use this website judiciously and donate plasma before getting vaccinated.</p>
                </div>
            </section>

            <section class="col-md-12 content padding tm-float-section tm-section-3">
                <div class="col-lg-6 col-md-6 content-item tm-black-translucent-bg"></div>
                <div class="col-lg-6 col-md-6 content-item tm-white-translucent-bg"></div>

                <div class="tm-float-section-header">
                    <h2 class="text-center tm-white-text tm-section-3-header">List Of Centers</h2>
                </div>

                <div class="tm-float-section-body tm-white-bg">
                    <div class="col-lg-12">
                        {showCenter()}
                    </div>
                </div>

            </section>
        </div>
        <div class="text-center footer">
            <div class="container">
                Copyright &copy; <span class="tm-current-year">2021 |</span> Nitin Gupta
                
                | Contact: nitingup.96@gmail.com
            </div>
        </div>
    </>
    );


}

export default Main;
