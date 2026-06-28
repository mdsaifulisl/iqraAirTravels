import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import VisaServiceCard from '../shared/VisaServiceCard'; 
import VisaJsonData from '../../data/visa.json'; 

// api data fetching hook
import useVisas from "../../hooks/useVisas";


const HomeVisa = () => {

      const { visas, loading } = useVisas();
    const featuredVisas = visas.length > 0 ? visas.slice(0, 3) : VisaJsonData.slice(0, 3); 


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="spinner-border text-teal" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
   
    return (
        <section className="home-visa-section py-5 bg-alice-blue">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-md-8">
                        <h6 className="text-coral fw-bold mb-2">Our Visa Services</h6>
                        <h2 className="display-6 fw-bold text-teal">Get Your Visa Easily With Us</h2>
                        <p className="text-muted">We provide expert consultancy for all types of visas worldwide.</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <Link to="/visa-service" className="btn btn-outline-teal rounded-pill px-4 fw-bold">
                            View All Visas <FaArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>

                <div className="row g-4">
                    {featuredVisas.map((visa) => (
                        <div className="col-lg-4 col-md-6" key={visa.id}>
                            <VisaServiceCard visa={visa} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeVisa;