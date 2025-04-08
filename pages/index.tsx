import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowUp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    toast.success("Welcome to SnapMart!");
  }, []);

  const products = [
    { name: "Hoodie", price: "$19.99", img: "hoodie3.jpg" },
    { name: "Smartwatch", price: "$49.99", img: "watch1.jpg" },
    { name: "Backpack", price: "$29.99", img: "backpack2.jpg" },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_vf2sz7z",
        "template_h5c320o",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "_9KYCO_DYhr77mRlF"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message.");
      });
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gradient-to-b from-primary to-secondary text-white">
        <header className="p-6 flex justify-between items-center bg-black bg-opacity-80 fixed w-full z-10">
          <h1 className="text-2xl font-bold">SnapMart</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="#about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/registration" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <h2 className="text-5xl text-black font-extrabold mb-4">
            Welcome to SnapMart
          </h2>
          <p className="text-lg text-black mb-6">
            Discover, Shop & Sell Unique Products Online.
          </p>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            className="w-full max-w-4xl rounded-lg shadow-lg bg-blue-200"
          >
            {[
              "carousel1.jpg",
              "carousel2.jpg",
              "carousel3.jpg",
              "carousel4.jpg",
              "carousel5.jpg",
              "carousel6.jpg",
              "carousel7.jpg",
              "carousel8.jpg",
              "carousel9.jpg",
              "carousel10.jpg",
            ].map((img, i) => (
              <SwiperSlide
                key={i}
                className="flex justify-center items-center h-80"
              >
                <img
                  src={`/demo/${img}`}
                  alt="Product"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section id="about" className="p-10 text-center bg-gray-900">
          <h3 className="text-4xl font-bold mb-4">About SnapMart</h3>
          <p className="text-lg max-w-3xl mx-auto">
            SnapMart is a modern digital marketplace designed for young
            entrepreneurs and shoppers. Whether you're looking for trendy
            apparel, unique gadgets, or custom accessories, we've got you
            covered!
          </p>
        </section>

        <section className="p-10 bg-gray-900 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Why SnapMart?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Trendy Products",
                desc: "Find the latest fashion trends and gadgets.",
              },
              {
                title: "Secure Payments",
                desc: "Shop with confidence using secure payment methods.",
              },
              {
                title: "Fast Delivery",
                desc: "Get your orders delivered quickly to your doorstep.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-xl shadow-lg"
              >
                <h4 className="text-xl font-bold">{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-10">
          <motion.h3
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white text-center mb-10"
          >
            Trending Products
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(59,130,246,0.5)",
                }}
                className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out"
              >
                <motion.img
                  src={`/demo/${product.img}`}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
                <h4 className="text-xl font-bold">{product.name}</h4>
                <p className="text-gray-600">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-b from-primary to-secondary text-white p-10 text-center">
            <h3 className="text-3xl text-black font-bold mb-4">
              Join SnapMart Today!
            </h3>
            <p className="text-lg text-black mb-6">
              Sign up to start shopping and selling unique products online.
            </p>
            <Link href="/auth/registration">
              <button className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition">
                Register Now
              </button>
            </Link>
          </div>
        </section>

        <section className="p-10 bg-gray-900 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Testimonials</h3>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            className="w-full max-w-4xl mx-auto"
          >
            {[
              {
                name: "John Doe",
                review:
                  "SnapMart has changed the way I shop online. The variety is amazing!",
              },
              {
                name: "Jane Smith",
                review:
                  "I love the trendy products available on SnapMart. Highly recommend!",
              },
              {
                name: "Alice Johnson",
                review:
                  "Fast delivery and great customer service. I'm a happy customer!",
              },
              {
                name: "Bob Brown",
                review:
                  "SnapMart is my go-to place for unique gadgets and gifts.",
              },
              {
                name: "Charlie Green",
                review:
                  "The shopping experience on SnapMart is seamless and enjoyable.",
              },
              {
                name: "Daisy White",
                review:
                  "I found the perfect outfit for my event on SnapMart. Love it!",
              },
              {
                name: "Ethan Black",
                review:
                  "SnapMart offers a great selection of products at competitive prices.",
              },
            ].map((testimonial, index) => (
              <SwiperSlide key={index} className="p-6">
                <blockquote className="text-lg italic">
                  "{testimonial.review}"
                </blockquote>
                <cite className="block mt-4 font-bold">
                  - {testimonial.name}
                </cite>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <div className="bg-gray-900 text-white p-10 text-center">
            <h3 className="text-3xl font-bold mb-4">Our Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
              {[
                "partner1.png",
                "partner2.jpg",
                "partner3.jpg",
                "partner4.jpg",
                "partner5.jpg",
                "partner6.jpg",
                "partner7.jpg",
              ].map((partner, index) => (
                <img
                  key={index}
                  src={`/demo/${partner}`}
                  alt="Partner"
                  className="h-20 w-auto rounded-3xl shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="p-10 bg-gray-900 text-center lg:text-left"
        >
          <h3 className="text-3xl font-bold text-center mb-6">Contact Us</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Get in Touch</h4>
              <form className="space-y-4" onSubmit={sendEmail}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-xl text-white py-3 rounded-lg hover:opacity-80"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Our Address</h4>
              <p className="flex items-center space-x-2">
                <FaMapMarkerAlt /> <span>123 GenZ Street, Kolkata, WB</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone /> <span>+91 234 567 890</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope /> <span>support@snapmart.com</span>
              </p>

              <p className="flex items-center space-x-2 mt-8">
                <FaMapMarkerAlt /> <span>52 Row Street, Kolkata, WB</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone /> <span>+91 234 567 890</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope /> <span>support@snapmart.com</span>
              </p>

              <p className="flex items-center space-x-2 mt-8">
                <FaMapMarkerAlt />{" "}
                <span>5th Floor, 16B XYZ Street, Kolkata, WB</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone /> <span>+91 234 567 890</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope /> <span>support@snapmart.com</span>
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-black p-8 text-center mt-10">
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/Ramsey99" target="_blank">
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/anuradha-adhikari/"
              target="_blank"
            >
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/RaniAdhikari1" target="_blank">
              <FaTwitter size={24} />
            </a>
          </div>
          <p className="mt-4">&copy; 2025 SnapMart. All Rights Reserved.</p>
          <button
            className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:scale-110 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowUp size={20} />
          </button>
        </footer>
      </div>
    </>
  );
}
