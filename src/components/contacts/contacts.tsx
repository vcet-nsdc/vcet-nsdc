import React from 'react'

 const Contacts = () => {
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

      {/* Contact Information */}
      <div className="pt-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-center">Contact Information</h3>
        <div className="mx-auto mt-6 h-px w-11/12 md:w-8/12 bg-gray-700" />

        <div className="mt-8 space-y-4 text-center text-base md:text-lg">
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Chairperson</span>:&nbsp;
            <a className="underline hover:text-primary-light" href="shrya@vcet.edu.in">shrya@vcet.edu.in</a>
          </p>
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Secretary</span>:&nbsp;
            <a className="underline hover:text-primary-light" href="saloni.225257205@vcet.edu.in">  saloni.225257205@vcet.edu.in</a>
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