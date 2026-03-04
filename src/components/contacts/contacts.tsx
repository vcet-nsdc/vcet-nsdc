'use client'
import { useState } from 'react'

const Contacts = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else alert('Submission failed!')
    } catch {
      alert('Submission failed!')
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 mt-20">
      {/* Address Location (Google Map) */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">ADDRESS LOCATION</h2>
        <div className="w-full h-[380px] md:h-[460px] overflow-hidden rounded-xl border border-gray-800">
          <iframe
            title="VCET Location Map"
            src="https://www.google.com/maps?q=Vidyavardhini's%20College%20of%20Engineering%20and%20Technology%2C%20Vasai-Virar%20401202&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">Get in Touch</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/40 rounded-xl shadow-lg p-6 md:p-8 space-y-5 backdrop-blur-md border border-gray-500/30"
          style={{
            background:
              'linear-gradient(120deg, rgba(30,41,59,0.65) 60%, rgba(51,65,85,0.45) 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {submitted ? (
            <div className="text-green-400 text-center font-medium py-4">
              Thank you for reaching out! We will get back to you soon.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-primary transition"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-primary transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="contact">
                  Contact Number <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-primary transition"
                  placeholder="Contact Number"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="message">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:border-primary transition resize-y"
                  placeholder="Type your message here..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition"
              >
                Send Message
              </button>
            </>
          )}
        </form>
      </div>

      {/* Contact Information */}
      <div className="pt-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-center">Contact Information</h3>
        <div className="mx-auto mt-6 h-px w-11/12 md:w-8/12 bg-gray-700" />

        <div className="mt-8 space-y-4 text-center text-base md:text-lg">
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Chairperson</span>:&nbsp;
            <a className="underline hover:text-primary-light" href="mailto:shreya.225297202@vcet.edu.in ">shreya.225297202@vcet.edu.in </a>
          </p>
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Secretary</span>:&nbsp;
            <a className="underline hover:text-primary-light" href="mailto:saloni.225257205@vcet.edu.in">  saloni.225257205@vcet.edu.in</a>
          </p>
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">NSDC</span>:&nbsp;
            <a className="underline hover:text-primary-light" href="mailto:nsdc@vcet.edu.in">nsdc@vcet.edu.in</a>
          </p>

          <div className="mt-6 text-sm text-gray-300">
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts