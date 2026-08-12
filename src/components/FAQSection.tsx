"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "क्या आप फाइनेंसिंग (EMI) की सुविधा देते हैं?",
    a: "अगर आपको यह पूछना पड़ रहा है, तो हमारा सुझाव है कि आप पास के बस स्टैंड का टाइमटेबल चेक कर लें। वैसे, अगर आपको सिर्फ कुछ दिनों की नकदी की दिक्कत है, तो हम सोने की ईंटें और छोटे प्राइवेट आइलैंड के कागज़ात भी पेमेंट के तौर पर स्वीकार करते हैं।"
  },
  {
    q: "क्या मैं टेस्ट ड्राइव ले सकता हूँ?",
    a: "बिल्कुल। हमें बस यह सुनिश्चित करना है कि आपकी कुल संपत्ति (net worth) हमारी सबसे धीमी गाड़ी की टॉप स्पीड के नंबर से ज़्यादा हो। कृपया अपना ड्राइविंग लाइसेंस, इंश्योरेंस और अपने वेल्थ मैनेजर से साइन किया हुआ एक लेटर साथ लाएं।"
  },
  {
    q: "क्या गाड़ी में कप होल्डर (Cup holder) मिलेगा?",
    a: "हमारे इंजीनियर्स ने गाड़ी को हवा से बातें करने लायक बनाने के लिए 400 घंटे लगाए हैं; उन्होंने आपके दो लीटर वाले गन्ने के रस या कोल्ड ड्रिंक के गिलास का कोई हिसाब नहीं लगाया था। इसलिए, नहीं। हालाँकि, अगर आप चाहें तो हम पीछे की सीट पर शैंपेन चिलर ज़रूर लगवा सकते हैं।"
  },
  {
    q: "इसकी सर्विसिंग और इंजन ऑयल बदलने का खर्चा कितना आएगा?",
    a: "लगभग उतना ही जितने में एक अच्छी कॉलेज डिग्री आ जाए। हमारे टेक्नीशियन इसमें दुनिया का सबसे बेहतरीन सिंथेटिक ऑयल डालते हैं, जिसे उन धीमी गाड़ियों के ड्राइवरों के आंसुओं से बनाया गया है जिन्हें आपने सड़क पर पीछे छोड़ दिया था।"
  },
  {
    q: "यह असल में कितनी तेज़ भागती है?",
    a: "इतनी तेज़ कि आप अपनी ज़िम्मेदारियों, अपने रिश्तेदारों के तानों और पुलिस के हेलीकॉप्टर को भी पल भर में पीछे छोड़ सकें। बाकी इसका स्पीडोमीटर देख लीजिए, वह जितना दिखाता है, गाड़ी उससे कहीं ज़्यादा कमाल करती है।"
  },
  {
    q: "क्या मेरी गोल्फ किट डिक्की (Trunk) में आ जाएगी?",
    a: "हाँ, बशर्ते आपका कैडी बाकी के गोल्फ क्लब किसी दूसरी गाड़ी में लेकर आ रहा हो। इसकी डिक्की को सिर्फ एक इटैलियन लेदर के डिज़ाइनर बैग को रखने के लिए बनाया गया है। वैसे आपके पास एक और विकल्प है—आप चाहें तो पूरा गोल्फ कोर्स ही खरीद लें और अपनी किट वहीं रख दें।"
  },
  {
    q: "यह गाड़ी माइलेज (Average) कितना देती है?",
    a: "हम अपनी गाड़ियों को \"किलोमीटर प्रति लीटर\" में नहीं, बल्कि \"स्माइल प्रति किलोमीटर\" में मापते हैं। अगर आप पेट्रोल पंप पर पैसे बचाने के लिए बार-बार फ्यूल मीटर देख रहे हैं, तो यह शानदार मशीन आपको पैनिक अटैक दे सकती है।"
  },
  {
    q: "क्या यह एक अच्छी फैमिली कार है?",
    a: "यह उस दो लोगों की फैमिली के लिए एकदम सही है जिन्हें एक-दूसरे के बिल्कुल बगल में बैठना पसंद नहीं है और जिन्हें 3 घंटे के अंदर दूसरे शहर पहुंचना है। वैसे भी, प्रीमियम लेदर की महंगी सीटों पर छोटे बच्चों को बिठाना आपके बैंक बैलेंस के लिए हानिकारक हो सकता है।"
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 relative z-30">
      <div className="text-center mb-10">
        <h2 
          className="text-3xl md:text-5xl text-rickshaw-yellow mb-4 drop-shadow-md"
          style={{ fontFamily: "var(--font-yatra-one)" }}
        >
          अक्सर पूछे जाने वाले सवाल (FAQ)
        </h2>
        <p className="text-white/60 text-sm md:text-base tracking-widest uppercase font-medium" style={{ fontFamily: "var(--font-inter)" }}>
          Strictly for VIP Customers
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`glass-gold rounded-xl overflow-hidden border transition-all duration-300 shadow-lg ${
              openIndex === index ? "border-rickshaw-yellow/60 bg-black/80 shadow-[0_4px_20px_rgba(255,215,0,0.15)] scale-[1.02]" : "border-white/20 hover:border-rickshaw-yellow/40 bg-black/60 hover:bg-black/70"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span 
                className={`text-xl md:text-2xl pr-4 transition-colors duration-300 ${openIndex === index ? "text-rickshaw-yellow font-medium" : "text-white/95"}`}
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                {faq.q}
              </span>
              <ChevronDown 
                className={`text-rickshaw-yellow/80 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
                size={24} 
              />
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2 text-white/90 text-base md:text-lg leading-relaxed border-t border-white/10" style={{ fontFamily: "var(--font-inter)" }}>
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
