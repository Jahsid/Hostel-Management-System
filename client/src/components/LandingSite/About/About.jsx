import React from "react";
import hostelImage from "../../../assets/angelica.jpg";

function About() {
  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl py-10">About Us</h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-10">
        <img src={hostelImage} alt="Hostel" className="rounded-lg shadow-md w-full md:w-1/2 mb-10 md:mb-0" />
        <div className="text-lg text-white w-full md:w-1/2 md:pl-10">
          <p>
            Welcome to our Hostel Management System! We are dedicated to providing efficient and reliable solutions for managing hostels and accommodations. Whether you are a hostel owner, manager, or staff member, our system is designed to meet your needs and simplify your workflow. Say goodbye to manual paperwork and time-consuming tasks, and hello to a more efficient way of managing your hostel! Thank you for choosing our Hostel Management System. We are committed to continuously improving our platform and providing exceptional service to our users.
          </p>
        </div>
      </div>
      <footer className="footer bg-white text-black p-5">
        <div className="container mx-auto flex flex-wrap justify-around">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <header className="footer-title">Services</header>
            <nav>
              <a href="#" className="link link-hover block">Branding</a>
              <a href="#" className="link link-hover block">Design</a>
              <a href="#" className="link link-hover block">Marketing</a>
              <a href="#" className="link link-hover block">Advertisement</a>
            </nav>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <header className="footer-title">Company</header>
            <nav>
              <a href="#" className="link link-hover block">About us</a>
              <a href="#" className="link link-hover block">Contact</a>
              <a href="#" className="link link-hover block">Jobs</a>
              <a href="#" className="link link-hover block">Press kit</a>
            </nav>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <header className="footer-title">Social</header>
            <nav className="grid grid-cols-3 gap-4">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </footer>
      <footer className="footer bg-white p-4 text-center">
        <div>
          <p>&copy; 2024 - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export { About };
