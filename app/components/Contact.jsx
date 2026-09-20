"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { Mail, Github, Linkedin, Code2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { fadeUp, viewportOnce } from "@/app/lib/motion";
import { personal } from "@/app/lib/data/personal";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

const inputClasses =
  "w-full p-3 outline-none border border-border rounded-xl bg-card text-text placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";

const errorClasses = "text-danger text-xs mt-1.5";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
];

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
};

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    formData.append("access_key", "f325c04c-c727-4c9c-a008-38c75155d521");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Connect With Me"
        title="Let's build something useful."
        subtitle="Whether you're hiring, collaborating on a project, or simply want to connect, feel free to reach out."
      />

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-4"
        >
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            {personal.email}
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href={personal.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={personal.links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
          >
            <Code2 className="w-4 h-4" aria-hidden="true" />
            LeetCode
          </a>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {FIELDS.slice(0, 2).map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="sr-only">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  className={inputClasses}
                />
                {errors[field.name] && (
                  <p id={`${field.name}-error`} className={errorClasses}>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="subject" className="sr-only">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={inputClasses}
            />
            {errors.subject && (
              <p id="subject-error" className={errorClasses}>
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Your message"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={inputClasses}
            />
            {errors.message && (
              <p id="message-error" className={errorClasses}>
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={status === "loading"}
            className="w-max"
          >
            Send Message
          </Button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="flex items-center gap-2 text-success text-sm">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Message sent successfully. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-danger text-sm">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
