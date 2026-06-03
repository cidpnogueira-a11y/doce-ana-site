import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "./components/ui/aurora-background";
import DigitalPetalsShader from "./components/ui/digital-petals-shader";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const bentoImages = [
  { src: "/assets/bento-1.jpg", alt: "Bentô Dinossauro - Ravi 2 anos" },
  { src: "/assets/bento-2.jpg", alt: "Bentô Cerejinhas - Athena 1 mês" },
  { src: "/assets/bento-3.jpg", alt: "Bentô Homem de Ferro - Otávio 2 meses" },
  { src: "/assets/bento-4.jpg", alt: "Bentô Dinossauro Baby - Bryan 2 meses" },
  { src: "/assets/bento-5.jpg", alt: "Bentô Volta ao Sol - Caetano" },
  { src: "/assets/bento-6.jpg", alt: "Bentô Shape em dia - 66 anos" },
  { src: "/assets/bento-7.jpg", alt: "Bentô Leãozinho - Bernardo 4 meses" },
  { src: "/assets/bento-8.jpg", alt: "Bentô Branca de Neve - Alana 2 meses" },
];

const doceImages = [
  { src: "/assets/doce-1.jpg", alt: "Bolo no Pote com Morango" },
  { src: "/assets/doce-2.jpg", alt: "Bolo no Pote de Caramelo" },
  { src: "/assets/doce-3.jpg", alt: "Brownies com Caramelo" },
  { src: "/assets/doce-4.jpg", alt: "Fatia de Bolo com Chocolate" },
  { src: "/assets/doce-5.jpg", alt: "Palha Italiana" },
  { src: "/assets/doce-6.jpg", alt: "Brigadeiros Gourmet" },
  { src: "/assets/doce-7.jpg", alt: "Brigadeiro na Caixa - Boas Festas" },
  { src: "/assets/doce-8.jpg", alt: "Docinhos de Natal" },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: typeof bentoImages; index: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = (images: typeof bentoImages, index: number) => {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const goNext = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
  }, [lightbox]);

  const goPrev = useCallback(() => {
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, goNext, goPrev]);

  return (
    <AuroraBackground className="min-h-screen">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full p-4 px-[5%] flex justify-center items-center transition-all duration-300 z-50 ${scrolled ? 'bg-[#FBF8F1]/95 shadow-md backdrop-blur-md' : 'bg-[#FBF8F1]/80 backdrop-blur-sm'}`}>
        <div className="h-[60px] overflow-hidden">
          <img src="/assets/logo-transparent.png" alt="Doce Ana Logo" className="h-full object-contain hover:scale-105 transition-transform duration-300" />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col pt-24">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[85vh] flex flex-col items-center justify-center text-center px-[5%] py-20 relative overflow-hidden">
          {/* Digital Petals WebGL Shader Background — disabled on mobile for performance */}
          {!isMobile && (
            <div className="absolute inset-0 z-0" style={{ pointerEvents: 'auto' }}>
              <DigitalPetalsShader />
            </div>
          )}
          {/* Overlay for text readability */}
          <div className={`absolute inset-0 z-[1] ${isMobile ? 'bg-[#FBF8F1]' : 'bg-[#FBF8F1]/70 backdrop-blur-[2px]'}`} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl relative z-[2]"
          >
            <p className="text-[#8C6B5D] text-lg font-medium tracking-widest uppercase mb-4">Confeitaria Artesanal</p>
            
            <h1 className="font-heading text-5xl md:text-7xl text-[#4A332A] mb-8 leading-tight">
              Bem-vinda à <br/><span className="text-[#8C6B5D] italic">Doce Ana</span>
            </h1>

            <p className="text-[#5A433A] text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Bolos bentôs, brigadeiros e docinhos feitos com carinho para transformar seus momentos em memórias inesquecíveis. <strong className="font-medium text-[#C19A6B]">Viva essa experiência.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#trabalhos" className="inline-block px-10 py-4 bg-[#4A332A] text-[#FBF8F1] rounded-full font-medium tracking-wide border-2 border-[#4A332A] hover:bg-transparent hover:text-[#4A332A] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Conhecer nossos doces
              </a>
              <a href="#encomendar" className="inline-block px-10 py-4 bg-transparent text-[#4A332A] rounded-full font-medium tracking-wide border-2 border-[#8C6B5D]/40 hover:border-[#4A332A] hover:bg-[#4A332A]/5 transition-all duration-300 hover:-translate-y-1">
                Fazer encomenda
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 text-[#8C6B5D]/50 relative z-[2]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="trabalhos" className="w-full bg-white/80 backdrop-blur-sm border-t border-[#8C6B5D]/10">
          
          <div className="max-w-6xl mx-auto text-center pt-24 pb-32 px-[5%]">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl text-[#4A332A] mb-4"
            >
              Um pouco do trabalho da <span className="text-[#8C6B5D]">Doce Ana</span>
            </motion.h2>
            <p className="text-[#5A433A] text-lg">Conheça nossas criações feitas com muito amor.</p>
          </div>

          {/* ContainerScroll - Bentôs */}
          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <p className="text-lg text-[#8C6B5D] font-medium mb-2">Confeitaria Artesanal</p>
                <h3 className="text-4xl md:text-[4rem] font-heading font-bold text-[#4A332A] leading-none">
                  Bolos Bentôs
                </h3>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-full p-2 md:p-4 bg-[#FBF8F1]">
              {bentoImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group cursor-pointer relative"
                  onClick={() => openLightbox(bentoImages, i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[#4A332A]/0 group-hover:bg-[#4A332A]/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#4A332A]/60 px-3 py-1 rounded-full backdrop-blur-sm">Ampliar</span>
                  </div>
                </div>
              ))}
            </div>
          </ContainerScroll>

          {/* Spacer between grids */}
          <div className="h-24 md:h-16" />

          {/* ContainerScroll - Docinhos */}
          <ContainerScroll
            titleComponent={
              <div className="mb-8">
                <p className="text-lg text-[#8C6B5D] font-medium mb-2">Doçura em cada detalhe</p>
                <h3 className="text-4xl md:text-[4rem] font-heading font-bold text-[#4A332A] leading-none">
                  Docinhos & Brigadeiros
                </h3>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-full p-2 md:p-4 bg-[#FBF8F1]">
              {doceImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group cursor-pointer relative"
                  onClick={() => openLightbox(doceImages, i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[#4A332A]/0 group-hover:bg-[#4A332A]/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#4A332A]/60 px-3 py-1 rounded-full backdrop-blur-sm">Ampliar</span>
                  </div>
                </div>
              ))}
            </div>
          </ContainerScroll>
        </section>

        {/* About / Authority Section */}
        <section id="sobre" className="w-full py-24 px-[5%] bg-[#FBF8F1] border-t border-[#8C6B5D]/10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <img src="/assets/media__1780332543819.jpg" alt="Foto da Ana" className="w-full max-w-[460px] aspect-[4/5] object-cover rounded-[20px] border-8 border-white shadow-2xl mx-auto" />
              
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#C19A6B] text-white w-36 h-36 rounded-full flex items-center justify-center text-center font-heading italic text-xl leading-tight shadow-xl border-4 border-white"
              >
                Desde<br/>2017
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <p className="text-[#8C6B5D] text-sm font-semibold tracking-widest uppercase mb-3">Sobre</p>
              <h2 className="font-heading text-4xl md:text-5xl text-[#4A332A] mb-8 leading-tight">
                Muito Prazer, <br/>Eu sou a <span className="text-[#8C6B5D] italic">Ana!</span>
              </h2>

              <p className="text-[#5A433A] text-lg mb-4 text-justify">
                "A Doce Ana existe desde 2017, e eu iniciei na confeitaria somente para complementar renda mesmo, mas se tornou uma paixão. São 8 anos de muitos processos, altos e baixos, pausas, desânimos, cansaços, inseguranças, questionamentos, muita evolução e cada dia que passa, conquistas. Desde que comecei sempre conciliei a confeitaria com trabalho CLT, e esse ano decidi mudar isso e focar no que realmente é um amor pra mim."
              </p>

              <p className="text-[#5A433A] text-lg mb-8 text-justify">
                Agradeço a todos os clientes por confiarem no meu trabalho e permitir que Doce Ana faça parte de momentos especiais. Espero que continuem comigo nessa nova jornada que me trará muito aprendizado, muitas novidades e delícias. Acompanhem essa nova etapa da Doce Ana! 🤎✨🥹🙏🏾🚀
              </p>

              <div className="bg-[#8C6B5D]/10 p-6 border-l-4 border-[#C19A6B] rounded-r-lg">
                <p className="font-heading italic text-xl text-[#4A332A]">"Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos."</p>
                <p className="text-[#8C6B5D] text-sm mt-2 font-semibold">(Provérbios 16:3)</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* CTA Section */}
        <section id="encomendar" className="w-full bg-[#4A332A] py-24 px-[5%] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(/assets/media__1780332570530.png)', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-[#FBF8F1] mb-6">Pronto para tornar seu momento especial?</h2>
            <p className="text-[#FBF8F1]/80 text-xl mb-12">
              Faça sua encomenda e <strong className="text-[#C19A6B] font-semibold">Viva essa experiência</strong> única com a Doce Ana.
            </p>
            
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-semibold text-lg hover:bg-[#128C7E] transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)]">
              <MessageCircle size={24} />
              Encomendar pelo WhatsApp
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#FBF8F1] py-12 text-center border-t border-[#8C6B5D]/20">
          <img src="/assets/media__1780332572252.png" alt="Logo Doce Ana" className="h-20 mx-auto mb-6 object-contain" />
          <p className="text-[#8C6B5D] text-sm">&copy; 2026 Doce Ana. Todos os direitos reservados.</p>
        </footer>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/60 text-sm font-medium">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={lightbox.images[lightbox.index].src}
              alt={lightbox.images[lightbox.index].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm"
            >
              <ChevronRight size={28} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-8 text-white/80 text-center font-medium text-lg">
              {lightbox.images[lightbox.index].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </AuroraBackground>
  );
}

export default App;
