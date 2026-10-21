import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import AnimatedSection from "../components/AnimatedSection";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_scte7vc", // Service ID
        "template_wtiqjki", // Template ID
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "6DHkhluaRR3aSO3Mb", // Public Key
      );

      toast.success("Thank you! Your message has been sent successfully.");
      reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="max-w-[1400px] mx-auto c-space my-20"
    >
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <img
          src="/assets/terminal.png"
          alt="Terminal"
          className="absolute inset-0 w-full h-full "
        />
        <div className="contact-container relative z-10">
          <h3 className="head-text">Let's Talk</h3>
          <p className="text-lg text-slate-400 mt-3">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 flex flex-col space-y-7"
          >
            {/* Full Name */}
            <label className="flex flex-col space-y-2">
              <span className="field-label">Full Name</span>
              <input
                className={`field-input transition-colors duration-200 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10"
                }`}
                placeholder="John Doe"
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-400 text-xs font-medium animate-fade-in">
                  {errors.name.message}
                </span>
              )}
            </label>

            {/* Email */}
            <label className="flex flex-col space-y-2">
              <span className="field-label">Email</span>
              <input
                className={`field-input transition-colors duration-200 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10"
                }`}
                placeholder="john.doe@example.com"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-xs font-medium animate-fade-in">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Message */}
            <label className="flex flex-col space-y-2">
              <span className="field-label">Message</span>
              <textarea
                className={`field-input resize-none transition-colors duration-200 ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10"
                }`}
                placeholder="Your message here..."
                rows={5}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <span className="text-red-400 text-xs font-medium animate-fade-in">
                  {errors.message.message}
                </span>
              )}
            </label>

            {/* Submit Button */}
            <button
              className="field-btn cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow -ml-2 w-6 h-6"
              />
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Contact;
