import React from 'react';

const ContactSection = () => {
  const inputStyle = "bg-white/10 backdrop-blur-md border border-white/10 text-white p-4 rounded-xl w-full text-base focus:outline-none focus:border-white/40 transition-colors";

  return (
    <section id="contact" className="container mx-auto px-6 pt-24 pb-64 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-stretch gap-10 w-full max-w-5xl py-10">

        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-start pt-10">
          <h3 className="text-4xl md:text-5xl font-medium leading-tight mb-6">
            Diskusikan detail<br className="hidden md:block" />lahan Anda?
          </h3>
          <p className="text-white/60 mb-10 text-lg">Hubungi tim Recoplant.</p>

          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-105 transition-transform">in</a>
            <a href="#" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-105 transition-transform">ig</a>
          </div>
        </div>

        {/* Middle Divider Image (Hidden on very small screens) */}
        <div className="hidden sm:flex flex-none justify-center px-4 w-[150px] md:w-[200px]">
          <div className="h-full w-full relative">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
              alt="Wheat Stalk"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="flex-1 flex flex-col justify-center pt-10">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nama"
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Telepon"
              className={inputStyle}
            />
            <textarea
              placeholder="Komentar"
              rows={4}
              className={`${inputStyle} resize-none`}
            />
            <button className="bg-transparent border border-white/20 text-white py-4 px-6 rounded-xl font-medium cursor-pointer hover:bg-white/10 transition-colors mt-2">
              Kirim Pesan
            </button>
            <p className="text-xs text-white/40 text-center mt-2">
              Dengan menekan tombol, Anda menyetujui pemrosesan data.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
