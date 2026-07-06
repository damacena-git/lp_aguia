import { useState, useEffect } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Flame, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Pizza, 
  ChefHat, 
  MessageCircle, 
  Award,
  Share2,
  Locate
} from "lucide-react";

// Types
interface Speaker {
  name: string;
  role: string;
  bio: string;
  image: string;
  tag: string;
  points: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function App() {
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 35,
    hours: 2,
    minutes: 32,
    seconds: 53,
  });

  // Calculate countdown to August 8, 2026
  useEffect(() => {
    const targetDate = new Date("2026-08-08T09:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Fallback default mock countdown if date passed (though target is 2026)
        setTimeLeft({ days: 34, hours: 14, minutes: 28, seconds: 45 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Live seats counter state
  const [seatsLeft, setSeatsLeft] = useState(17);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft(prev => {
        if (prev <= 4) return 4;
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Gourmet pizza interactive selection state
  const [selectedPizzaTab, setSelectedPizzaTab] = useState<"crostini" | "classicas" | "especiais" | "doces">("especiais");

  // Notification Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const speakers: Speaker[] = [
    {
      name: "Jackeline Araújo",
      role: "Mentora em Alta Performance & Criadora do Summit",
      tag: "Anfitriã Principal",
      image: "/jackeline.webp",
      bio: "Carrega mais de 15 anos de experiência em vendas de produtos físicos e 7 anos de atuação estratégica no digital, transformando conhecimento em resultados reais. Desenvolveu métodos de reprogramação mental e execução prática para desbloquear o crescimento.",
      points: ["Especialista em reprogramação mental", "Alta Performance", "Vendas"]
    },
    {
      name: "Diego Damacena",
      role: "Estrategista Digital - Tráfego Pago, CRM e Automações",
      tag: "Palestrante Convidado",
      image: "/diego damacena.png",
      bio: "Estrategista digital especializado em tráfego pago, CRM e automações. Ajuda empresas a escalar vendas através de sistemas de alta performance e tecnologia.",
      points: ["Tráfego pago avançado", "Automações de vendas", "Estratégias de CRM"]
    },
    {
      name: "Marco Lobo",
      role: "Especialista em Comunicação",
      tag: "Palestrante Convidado",
      image: "/Marco Lobo.jpeg",
      bio: "Especialista em comunicação persuasiva e oratória, com experiência em transformar profissionais em referências do mercado através da arte de se comunicar com impacto.",
      points: ["Comunicação persuasiva", "Oratória e apresentação", "Mensagem de marca forte"]
    }
  ];

  const pizzaMenu = {
    crostini: [
      { name: "Crostini Clássico", desc: "Baguete italiano assado, azeite trufado e orégano fresco." },
      { name: "Crostini com Pesto", desc: "Baguete crocante com pesto genovês caseiro e tomate cereja grelhado." },
      { name: "Crostini Caprese", desc: "Muçarela fresca, tomate heirloom e manjericão, finalizado com balsâmico." }
    ],
    classicas: [
      { name: "Marguerita Premium", desc: "Molho de tomate artesanal, muçarela de búfala, manjericão fresco gigante e azeite trufado." },
      { name: "Calabresa Defumada", desc: "Calabresa artesanal defumada ao forno a lenha, cebola roxa marinada e azeitonas pretas." },
      { name: "Calzone Quatro Queijos", desc: "Muçarela, provolone, gorgonzola e Grana Padano dentro de massa crocante." },
      { name: "Calzone Italiano", desc: "Presunto, salame, muçarela e manjericão em uma casquinha dourada." }
    ],
    especiais: [
      { name: "Parma com Figo e Mel", desc: "Presunto Parma premium fatiado fininho, figos frescos caramelizados e fios de mel silvestre." },
      { name: "Quatro Queijos Especiais", desc: "Gorgonzola Dolce, muçarela, provolone defumado e Grana Padano ralado na hora." },
      { name: "Rúcula com Tomate Seco", desc: "Rúcula fresca crocante de cultivo orgânico e tomates secos caseiros selecionados." },
      { name: "Prosciutto e Rúcula", desc: "Presunto italiano fatiado, rúcula fresca e shavings de parmesão." },
      { name: "Bacon com Cheddar", desc: "Bacon crocante, cheddar derretido e molho barbacoa especial." },
      { name: "Frango com Catupiry", desc: "Frango grelhado, Catupiry original e um toque de azeitonas." }
    ],
    doces: [
      { name: "Chocolate Belga com Morangos", desc: "Chocolate belga meio amargo derretido com morangos frescos e raspas de chocolate branco." },
      { name: "Creme de Avelã com Pistache", desc: "Nutella pura, pedaços de pistache tostado e uma leve pitada de flor de sal." }
    ]
  };

  const faqItems: FAQItem[] = [
    {
      question: "O que é o Águias Summit Elevate?",
      answer: "O Águias Summit Elevate é um evento presencial exclusivo projetado especificamente para empreendedores, profissionais liberais e vendedores de alta performance que desejam reprogramar sua mentalidade, aprender táticas assertivas de fechamento e fazer networking de altíssimo nível."
    },
    {
      question: "Para quem é o evento?",
      answer: "Para quem já se cansou de resultados médios. Se você quer escalar seu faturamento, se posicionar como referência absoluta no seu nicho, criar uma mentalidade inabalável de campeão e fechar vendas de alto valor, esse evento foi desenhado sob medida para você."
    },
    {
      question: "O que está incluso no evento?",
      answer: "Acesso total a todas as palestras dos 3 mentores, material didático premium de apoio, sessão interativa de networking guiada, e alimentação livre inclusa no local com pizzas artesanais preparadas na hora pelo buffet premium 'O Pizzaiolo'."
    },
    {
      question: "O evento será presencial?",
      answer: "Sim! Totalmente presencial em Curitiba - PR, no dia 08 de Agosto de 2026, no requintado Centro Universitário CeUnina (Bacacheri). Uma estrutura impecável de som, luz, conforto e segurança."
    },
    {
      question: "Como funciona o networking durante o evento?",
      answer: "Além dos intervalos e do momento da pizza 'O Pizzaiolo', teremos blocos específicos de networking ativo onde conectamos você diretamente com outros empresários, facilitando parcerias estratégicas imediatas."
    }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast("Link do evento copiado para a área de transferência! Compartilhe com sua equipe.");
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-['Montserrat',sans-serif] selection:bg-[#FFE419] selection:text-black overflow-x-hidden">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-zinc-900 border-2 border-[#FFE419] text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="text-[#FFE419] shrink-0 h-6 w-6" />
          <p className="text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Top Banner: Urgency and Countdown */}
      <div className="bg-gradient-to-r from-black via-[#111] to-black border-b border-zinc-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <p className="text-xs md:text-sm text-zinc-300 font-medium tracking-wide">
              🔥 <span className="text-[#FFE419] font-bold">ÚLTIMAS VAGAS COM VALOR PROMOCIONAL:</span> Apenas <span className="text-white bg-red-600 px-2 py-0.5 rounded font-black text-xs">{seatsLeft}</span> assentos restantes no lote atual.
            </p>
          </div>
          
          {/* Interactive Countdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mr-1">O Cronômetro está correndo:</span>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-center min-w-[38px]">
                <span className="font-bold text-[#FFE419] block text-sm">{timeLeft.days}</span>
                <span className="text-[8px] text-zinc-400 uppercase">Dias</span>
              </div>
              <span className="text-[#FFE419] font-bold">:</span>
              <div className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-center min-w-[38px]">
                <span className="font-bold text-[#FFE419] block text-sm">{timeLeft.hours}</span>
                <span className="text-[8px] text-zinc-400 uppercase">Horas</span>
              </div>
              <span className="text-[#FFE419] font-bold">:</span>
              <div className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-center min-w-[38px]">
                <span className="font-bold text-[#FFE419] block text-sm">{timeLeft.minutes}</span>
                <span className="text-[8px] text-zinc-400 uppercase">Min</span>
              </div>
              <span className="text-[#FFE419] font-bold">:</span>
              <div className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-center min-w-[38px]">
                <span className="font-bold text-red-500 block text-sm animate-pulse">{timeLeft.seconds}</span>
                <span className="text-[8px] text-zinc-400 uppercase">Seg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative py-16 md:py-28 px-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black border-b border-zinc-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/34947616/pexels-photo-34947616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        
        {/* Subtle decorative golden glowing circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Logo Brand area */}
          <div className="inline-flex flex-col items-center mb-8">
            <div className="relative">
              <span className="text-4xl md:text-5xl lg:text-6xl font-black font-['Cinzel'] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#ffe419] via-[#d4af37] to-[#aa771c] drop-shadow-md">
                ÁGUIAS
              </span>
              <div className="absolute -top-6 -right-6 text-yellow-500/40 font-['Cinzel'] text-xs font-bold tracking-widest border border-yellow-500/20 px-2 py-0.5 rounded uppercase">
                EDITION 2026
              </div>
            </div>
            
            <div className="flex items-center gap-3 my-2">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-500"></div>
              <span className="text-xs tracking-[0.4em] font-light text-yellow-500 uppercase">SUMMIT ELEVATE</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-500"></div>
            </div>
            
            <p className="text-[10px] md:text-xs text-zinc-400 tracking-[0.2em] font-medium uppercase max-w-md mx-auto leading-relaxed text-center mt-1">
              Um dia para quem decidiu parar de sonhar e começar a construir o extraordinário
            </p>
          </div>

          {/* Main Hook */}
          <span className="inline-block bg-yellow-500/10 text-[#FFE419] border border-yellow-500/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-6">
            ✨ O MAIOR EVENTO PRESENCIAL DE ALTA PERFORMANCE & VENDAS
          </span>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 font-['Montserrat',sans-serif] leading-tight text-white">
            Conexões Reais para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE419] via-[#FCE32A] to-[#ffaa00] underline decoration-[#FFE419]/40 decoration-wavy underline-offset-8">
              Resultados Práticos
            </span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Evento de alto nível para empreendedores e vendedores: reprogramação de mentalidade, técnicas de fechamento avançadas e conexão direta com quem acelera resultados. 
          </p>

          {/* Bullet metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl text-center">
              <Calendar className="h-6 w-6 text-[#FFE419] mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-medium">Data do Evento</p>
              <p className="text-sm font-bold text-white mt-1">08 de Agosto de 2026</p>
            </div>
            
            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl text-center">
              <MapPin className="h-6 w-6 text-[#FFE419] mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-medium">Local Premium</p>
              <p className="text-sm font-bold text-white mt-1">CeUnina - Curitiba/PR</p>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl text-center">
              <ChefHat className="h-6 w-6 text-[#FFE419] mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-medium">Catering Incluso</p>
              <p className="text-sm font-bold text-white mt-1">Pizzas O Pizzaiolo</p>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl text-center">
              <Users className="h-6 w-6 text-[#FFE419] mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-medium">Palestrantes de Elite</p>
              <p className="text-sm font-bold text-white mt-1">3 Grandes Mentores</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#ingressos"
              className="w-full sm:w-auto bg-gradient-to-r from-[#FFE419] via-[#FCE32A] to-[#E5C310] text-black font-extrabold px-10 py-5 rounded-xl text-base tracking-wider uppercase hover:shadow-[0_0_30px_rgba(252,227,42,0.4)] transition-all transform hover:-translate-y-1 text-center"
            >
              Quero Garantir Meu Ingresso Agora
            </a>
            <button 
              onClick={handleShare}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-5 rounded-xl text-sm tracking-wide border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" /> Compartilhar Evento
            </button>
          </div>

          {/* Safe & Secure Tag */}
          <div className="flex justify-center items-center gap-6 mt-8 text-zinc-400 text-xs">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Transação 100% Segura
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
            <span>Acesso Imediato ao Grupo VIP do WhatsApp</span>
          </div>

        </div>
      </header>

      {/* About Section & Event Concept */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Context & text */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2">
            <span className="h-1 w-8 bg-[#FFE419] rounded"></span>
            <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase">SOBRE O EVENTO</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Cinzel'] tracking-wide text-white leading-tight">
            Você não precisa de mais motivação. Você precisa do ambiente certo.
          </h2>
          
          <div className="space-y-4 text-zinc-300 font-light leading-relaxed">
            <p>
              A maioria das pessoas passa a vida esperando a oportunidade perfeita, o momento certo, o reconhecimento, o "milagre" acontecer. Enquanto isso, continuam presas nos mesmos resultados, nos mesmos ciclos e nas mesmas desculpas.
            </p>
            <p className="border-l-4 border-[#FFE419] pl-4 font-normal text-white">
              O <strong className="text-[#FFE419]">ÁGUIAS SUMMIT ELEVATE</strong> foi criado para quem decidiu parar de assistir à vida acontecer e assumir o posicionamento de quem nasceu para viver em alto nível.
            </p>
            <p>
              Porque resultados extraordinários não aparecem para quem se esconde. Eles pertencem a quem se posiciona, se conecta com pessoas maiores, aprende estratégias certas e escolhe ocupar lugares altos.
            </p>
            <p>
              Neste evento, você vai desenvolver mentalidade, visão, estratégia, execução e networking de alto impacto para romper padrões limitantes e construir uma nova realidade de faturamento e influência.
            </p>
          </div>

          {/* Interactive Seat Alert Widget */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-5 rounded-2xl border border-yellow-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-[#FFE419] text-black p-3 rounded-xl">
              <Clock className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">O próximo nível exige presença física.</p>
              <p className="text-xs text-zinc-400 mt-1">E a pergunta é: você vai continuar esperando... ou finalmente vai subir?</p>
            </div>
          </div>
        </div>

        {/* Right column: Ticket / Date Badge Box */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            {/* Elegant corner ribbons */}
            <div className="absolute top-0 right-0 bg-[#FFE419] text-black font-extrabold text-[10px] tracking-widest py-1.5 px-6 rotate-45 translate-x-5 translate-y-3 uppercase">
              CONFIRMADO
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-10 w-10 text-[#FFE419]" />
              <div>
                <h3 className="text-2xl font-black text-white font-['Cinzel']">08.AGOSTO.2026</h3>
                <p className="text-xs text-[#FFE419] tracking-wider uppercase font-semibold">SÁBADO • EVENTO PRESENCIAL</p>
              </div>
            </div>

            <hr className="border-zinc-800 my-6" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#FFE419] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Credenciamento Exclusivo</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Início às 8h para retirada do kit oficial de mentoria.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#FFE419] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">3 Palestrantes de Alto Impacto</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Sessões intensivas de 1h30m cada, focadas em estratégias acionáveis.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#FFE419] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Alimentação Gourmet no Local</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Delicie-se com pizzas artesanais assadas na hora por "O Pizzaiolo" inclusas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#FFE419] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Networking Direcionado</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Conecte-se com mais de 150 empreendedores do Sul do país.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 text-center">
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold block mb-1">LOCAL EXCLUSIVO EM CURITIBA</span>
              <span className="text-sm font-bold text-[#FFE419]">CeUnina - Centro Universitário Bacacheri</span>
            </div>
          </div>
        </div>

      </section>

      {/* The 4 Core Pillars of Transformation */}
      <section className="bg-zinc-950 py-20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full">METODOLOGIA COMPROVADA</span>
            <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide">Os 4 Pilares da Ascensão</h2>
            <p className="text-zinc-400 font-light">
              Toda mentoria foi estruturada em quatro pilares inegociáveis para garantir que você saia do evento pronto para dominar seu mercado.
            </p>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             
             {/* Pilar 1 */}
             <div className="bg-black/40 border border-zinc-800 hover:border-[#FFE419]/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-2">
               <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-[#FFE419] mb-6 group-hover:bg-[#FFE419] group-hover:text-black transition-all">
                 <Flame className="h-6 w-6" />
               </div>
               <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">PILAR 01</span>
               <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#FFE419] transition-all font-['Cinzel']">
                 MENTALIDADE DE ÁGUIA
               </h3>
               <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                 Supere os medos inconscientes que bloqueiam sua escalada, elimine a auto-sabotagem e fortaleça sua verdadeira identidade de líder imparável.
               </p>
             </div>

             {/* Pilar 2 */}
             <div className="bg-black/40 border border-zinc-800 hover:border-[#FFE419]/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-2">
               <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-[#FFE419] mb-6 group-hover:bg-[#FFE419] group-hover:text-black transition-all">
                 <Award className="h-6 w-6" />
               </div>
               <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">PILAR 02</span>
               <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#FFE419] transition-all font-['Cinzel']">
                 ESTRATÉGIA E EXECUÇÃO
               </h3>
               <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                 Métodos puramente práticos e testados em campo de batalha para planejar, gerenciar metas, estruturar ofertas irresistíveis e fechar vendas complexas.
               </p>
             </div>

             {/* Pilar 3 */}
             <div className="bg-black/40 border border-zinc-800 hover:border-[#FFE419]/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-2">
               <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-[#FFE419] mb-6 group-hover:bg-[#FFE419] group-hover:text-black transition-all">
                 <Users className="h-6 w-6" />
               </div>
               <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">PILAR 03</span>
               <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#FFE419] transition-all font-['Cinzel']">
                 NETWORKING DE ALTO NÍVEL
               </h3>
               <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                 Abra portas cruciais para parcerias valiosas. Conecte-se com pessoas de visão que entendem o seu idioma e aceleram exponencialmente seus resultados.
               </p>
             </div>

             {/* Pilar 4 */}
             <div className="bg-black/40 border border-zinc-800 hover:border-[#FFE419]/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-2">
               <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-[#FFE419] mb-6 group-hover:bg-[#FFE419] group-hover:text-black transition-all">
                 <Sparkles className="h-6 w-6" />
               </div>
               <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase">PILAR 04</span>
               <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#FFE419] transition-all font-['Cinzel']">
                 POSICIONAMENTO E MARCA
               </h3>
               <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                 Seja a autoridade definitiva do seu nicho de atuação. Aprenda a atrair os melhores clientes organicamente e cobrar o preço que você realmente merece.
               </p>
             </div>

           </div>

         </div>
       </section>

       {/* The 3 Elite Speakers Section */}
       <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
         <div className="max-w-7xl mx-auto px-4">
           
           <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
             <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full">MENTORIA DE ELITE</span>
             <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide">3 Palestrantes de Alto Impacto</h2>
             <p className="text-zinc-400 font-light">
               Diferente de congressos cansativos, o Águias Summit traz uma imersão focada com especialistas que vivem o que pregam no dia a dia.
             </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {speakers.map((speaker, index) => (
               <div 
                 key={index}
                 className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col hover:border-yellow-500/40 transition-all duration-300 group"
               >
                 
                 {/* Speaker image with elegant filter */}
                 <div className="h-80 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10"></div>
                   <img 
                     src={speaker.image} 
                     alt={speaker.name}
                     className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                   />
                   
                   {/* Speaker Tag */}
                   <span className="absolute top-4 left-4 z-20 bg-black/85 text-[#FFE419] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full border border-yellow-500/20 uppercase">
                     {speaker.tag}
                   </span>
                 </div>

                 {/* Speaker Details */}
                 <div className="p-8 flex-grow flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-bold text-white font-['Cinzel'] tracking-wide group-hover:text-[#FFE419] transition-all">
                       {speaker.name}
                     </h3>
                     <p className="text-[#FFE419] text-xs font-semibold tracking-wider uppercase mt-1">
                       {speaker.role}
                     </p>
                     
                     <p className="text-zinc-400 text-sm font-light leading-relaxed mt-4">
                       {speaker.bio}
                     </p>

                     <div className="mt-6 space-y-2">
                       <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase block">Foco da palestra:</span>
                       {speaker.points.map((pt, ptIdx) => (
                         <div key={ptIdx} className="flex items-center gap-2 text-xs text-[#FFE419]">
                           <CheckCircle2 className="h-4 w-4 text-[#FFE419] shrink-0" />
                           <span>{pt}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-zinc-800/60">
                     <a 
                       href="#ingressos" 
                       className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-[#FFE419] transition-all uppercase"
                     >
                       Ver detalhes do ingresso <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-all" />
                     </a>
                   </div>

                 </div>

               </div>
             ))}
           </div>

           {/* Special Bio Highlight for Jackeline Araújo - Event Creator */}
           <div className="mt-16 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
               
               <div className="lg:col-span-4 relative">
                 <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800">
                   <img 
                     src="/jackeline.webp"
                     alt="Jackeline Araújo"
                     className="w-full h-full object-cover object-top"
                   />
                 </div>
                 {/* Badge */}
                 <div className="absolute -bottom-4 left-6 right-6 bg-[#FFE419] text-black font-extrabold text-xs text-center py-2.5 rounded-xl shadow-xl uppercase tracking-widest">
                   Mentora High Performance
                 </div>
               </div>

               <div className="lg:col-span-8 space-y-6">
                 <div className="flex items-center gap-2">
                   <span className="h-[2px] w-8 bg-[#FFE419]"></span>
                   <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase">SOBRE A IDEALIZADORA</span>
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-extrabold font-['Cinzel'] tracking-wide text-white">
                   JACKELINE ARAÚJO
                 </h3>

                 <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed">
                   Mentora em Alta Performance e palestrante reconhecida, Jackeline Araújo carrega mais de 15 anos de experiência em vendas de produtos físicos e 7 anos de atuação estratégica no digital, transformando conhecimento em resultados reais. 
                 </p>

                 <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed">
                   Especialista em aceleração de performance, desenvolveu métodos poderosos que unem reprogramação mental, posicionamento estratégico e execução prática para desbloquear crescimento, autoridade e vendas em alto nível.
                 </p>

                 <div className="bg-zinc-900 border-l-4 border-[#FFE419] p-5 rounded-r-2xl italic text-zinc-300 text-sm md:text-base">
                   "Porque grandes resultados não acontecem por acaso. Eles acontecem quando a mente evolui, o posicionamento muda e a ação finalmente entra em movimento."
                 </div>
               </div>

             </div>
           </div>

         </div>
       </section>

      {/* Food Experience - O Pizzaiolo Feature Section */}
      <section className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
        
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.pexels.com/photos/1082342/pexels-photo-1082342.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200')" }}></div>
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Descriptive text */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
                <Pizza className="h-4 w-4 text-[#FFE419]" />
                <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase">EXPERIÊNCIA GOURMET</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide text-white leading-tight">
                Alimentação Inclusa no Local: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FFE419] font-serif italic">
                  O Pizzaiolo
                </span>
              </h2>

              <p className="text-zinc-300 font-light leading-relaxed">
                Esqueça os coffee breaks comuns com sanduíches frios e biscoitos industriais. No Águias Summit Elevate, preparamos uma verdadeira imersão gastronômica para os participantes do evento.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#FFE419]/10 p-2 rounded-lg text-[#FFE419] mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ingressos com Tudo Incluso</h4>
                    <p className="text-xs text-zinc-400">Tanto o Ingresso Geral quanto o VIP dão acesso livre ao buffet gourmet de pizzas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FFE419]/10 p-2 rounded-lg text-[#FFE419] mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Pizzas Assadas na Hora</h4>
                    <p className="text-xs text-zinc-400">Massa de fermentação lenta (48h), extremamente leve e saborosa para você aproveitar sem cansaço.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FFE419]/10 p-2 rounded-lg text-[#FFE419] mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Momento Networking Sabores</h4>
                    <p className="text-xs text-zinc-400">Combine a troca de cartões e novos negócios com uma fatia quentinha e uma bebida bem gelada.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Interactive Menu & Photo showcase */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Photo Card with label */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl aspect-video group">
<img 
                  src="/pizzaiolo.webp" 
                  alt="O Pizzaiolo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Parceiro Oficial de Catering</p>
                    <p className="text-base font-extrabold text-[#FFE419]">O Pizzaiolo Curitiba</p>
                  </div>
                  <span className="bg-red-600 text-white font-extrabold text-[10px] tracking-widest py-1 px-3 rounded-full uppercase">
                    Ao Vivo no Local
                  </span>
                </div>
              </div>

              {/* Interactive Pizza Menu Tab View */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex border-b border-zinc-800 mb-6 gap-2">
                  <button 
                    onClick={() => setSelectedPizzaTab("crostini")}
                    className={`flex-1 pb-3 text-xs md:text-sm font-bold tracking-wider uppercase transition-all border-b-2 text-center ${selectedPizzaTab === "crostini" ? "border-[#FFE419] text-[#FFE419]" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                    Crostini 🥖
                  </button>
                  <button 
                    onClick={() => setSelectedPizzaTab("especiais")}
                    className={`flex-1 pb-3 text-xs md:text-sm font-bold tracking-wider uppercase transition-all border-b-2 text-center ${selectedPizzaTab === "especiais" ? "border-[#FFE419] text-[#FFE419]" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                    🍕 Especiais do Chef
                  </button>
                  <button 
                    onClick={() => setSelectedPizzaTab("classicas")}
                    className={`flex-1 pb-3 text-xs md:text-sm font-bold tracking-wider uppercase transition-all border-b-2 text-center ${selectedPizzaTab === "classicas" ? "border-[#FFE419] text-[#FFE419]" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                    Clássicas
                  </button>
                  <button 
                    onClick={() => setSelectedPizzaTab("doces")}
                    className={`flex-1 pb-3 text-xs md:text-sm font-bold tracking-wider uppercase transition-all border-b-2 text-center ${selectedPizzaTab === "doces" ? "border-[#FFE419] text-[#FFE419]" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                    Doces / Sobremesas
                  </button>
                </div>

                <div className="space-y-4">
                  {pizzaMenu[selectedPizzaTab].map((item, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 hover:border-yellow-500/10 transition-all flex justify-between items-center gap-4"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                          {item.name}
                        </h5>
                        <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                      </div>
                      <span className="shrink-0 bg-yellow-500/10 text-[#FFE419] text-[10px] font-extrabold py-0.5 px-2 rounded uppercase border border-yellow-500/20">
                        Inclusa
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-zinc-500 text-center mt-5">
                  ⚠️ Bebidas não alcoólicas (suco, água, refrigerante) também estão inclusas sem custo adicional.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Event Pricing and Tickets Selector */}
      <section id="ingressos" className="py-24 bg-gradient-to-b from-zinc-950 to-black relative">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full">INSCREVA-SE JÁ</span>
            <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide">Garanta Seu Lugar na Mesa das Águias</h2>
            <p className="text-zinc-400 font-light">
              Escolha o passaporte ideal para o seu nível de ambição e prepare-se para o dia que mudará sua trajetória empresarial.
            </p>
          </div>

<div className="max-w-2xl mx-auto">
             
             {/* Ticket 01: Geral */}
             <div className="bg-zinc-900 border-2 border-[#FFE419] rounded-3xl p-8 flex flex-col justify-between hover:shadow-[0_0_40px_rgba(252,227,42,0.15)] transition-all relative">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFE419] to-amber-500 text-black font-extrabold text-[10px] tracking-widest py-1.5 px-4 rounded-full uppercase shadow-md">
                 ⭐ PROMOÇÃO LIMITADA
               </span>

               <div>
                 <span className="text-xs font-bold text-[#FFE419] tracking-wider uppercase bg-[#FFE419]/10 px-3 py-1 rounded-full">INGRESSO ÚNICO</span>
                 <h3 className="text-2xl font-bold font-['Cinzel'] text-white mt-4">Águias Summit Pass</h3>
                 <p className="text-xs text-white mt-1">Acesso completo ao evento de alta performance.</p>
                
<hr className="border-zinc-800 my-6" />

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#FFE419] shrink-0 mt-0.5" />
                    <span>Acesso a todas as palestras dos 3 mentores</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#FFE419] shrink-0 mt-0.5" />
                    <span>Alimentação inclusa no buffet "O Pizzaiolo"</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#FFE419] shrink-0 mt-0.5" />
                    <span>Material de apoio oficial impresso</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#FFE419] shrink-0 mt-0.5" />
                    <span>Acesso à área de Networking Exclusivo</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#FFE419] shrink-0 mt-0.5" />
                    <span>Kit de Boas-vindas Exclusivo</span>
                  </li>
                </ul>
              </div>

<div className="mt-8">
                  <p className="text-xs text-zinc-400">Por apenas</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-zinc-400">12x de</span>
                    <span className="text-3xl font-black text-[#FFE419]">R$ 12,25</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">ou R$ 147,00 à vista</p>

<a 
                    href="https://pay.hotmart.com/D105912983J?off=vuvbd5ey&hotfeature=51&_hi=eyJjaWQiOiIxNzc3MzgxNzE1NDkyODc0NDY4NzgzODA4ODMyODAiLCJiaWQiOiIxNzc3MzgxNzE1NDkyODc0NDY4NzgzODA4ODMyODAiLCJzaWQiOiJlODdiNTQ0MzgzZjM0MjJmOWM1YjY3ZDQ2NTJiNmUzZiJ9.1783361605734"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-gradient-to-r from-[#FFE419] to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold py-4 px-6 rounded-xl text-sm tracking-wider uppercase mt-6 transition-all inline-block text-center shadow-lg hover:shadow-[0_0_30px_rgba(252,227,42,0.4)] transform hover:scale-[1.02]"
                  >
                    Garantir Summit Pass Agora
                 </a>
               </div>
             </div>

           </div>

          {/* Secure details card */}
          <div className="max-w-2xl mx-auto mt-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 text-center text-xs text-zinc-400 space-y-3">
            <p>🔒 <strong>PAGAMENTO 100% SEGURO COM ACESSO IMEDIATO.</strong></p>
            <p>Seus dados de acesso e recibo fiscal de compra serão enviados no e-mail cadastrado logo após a aprovação da sua transação pela nossa plataforma.</p>
          </div>

        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-yellow-500 text-black py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/5 font-['Cinzel'] text-[14vw] font-black uppercase pointer-events-none select-none">
          GARANTIA
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="flex justify-center mb-2">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-[#FFE419] shadow-lg">
              <ShieldCheck className="h-10 w-10 stroke-[2]" />
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wider">
            Garantia Incondicional de 7 Dias
          </h2>

          <p className="text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed text-black/90">
            Seu dinheiro de volta <strong className="underline">sem perguntas</strong> até 7 dias após a compra. Se você se inscrever e sentir que as palestras, o ambiente de networking ou até mesmo a pizza não atenderam às suas expectativas, basta enviar um e-mail para nossa equipe de suporte e faremos o reembolso integral imediatamente.
          </p>

          <div className="h-[2px] w-12 bg-black mx-auto"></div>

          <p className="text-xs font-bold uppercase tracking-widest text-black/75">
            Risco Zero para Sua Evolução Profissional
          </p>
        </div>
      </section>

      {/* Location Detail & Map Section */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FFE419] tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full">LOCALIZAÇÃO</span>
            <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide">Como Chegar no Águias Summit</h2>
<p className="text-zinc-400 font-light">
               Fácil acesso, amplo estacionamento seguro <span className="text-zinc-500">(por conta do participante)</span> e infraestrutura de ponta no coração de Curitiba, PR.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left box: Address cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
                <div className="bg-yellow-500/10 text-[#FFE419] p-3 rounded-xl shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">ENDEREÇO DO EVENTO</h4>
                  <p className="text-base font-extrabold text-white mt-1">Rua Cláudio Chatagnier, 112</p>
                  <p className="text-xs text-zinc-400 mt-1">CeUnina - Centro Universitário, Bacacheri</p>
                  <p className="text-xs text-zinc-400">Curitiba, PR - CEP 82510-020</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
                <div className="bg-yellow-500/10 text-[#FFE419] p-3 rounded-xl shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">CRONOGRAMA DO DIA</h4>
                  <p className="text-base font-extrabold text-white mt-1">Sábado, 08 de Agosto de 2026</p>
                  <p className="text-xs text-zinc-400 mt-1">⏱️ Credenciamento: 08:30h às 09:15h</p>
                  <p className="text-xs text-zinc-400">⏱️ Imersão & Palestras: 09:30h às 18:30h</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h4 className="text-xs font-bold text-[#FFE419] uppercase tracking-wider mb-2">💡 Recomendações</h4>
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li>• Use vestimentas esporte fino para aproveitar melhor o networking fotográfico.</li>
                  <li>• Traga seu notebook ou bloco de anotações (nós forneceremos caneta exclusiva).</li>
                  <li>• Estacionamento no local está incluso de forma gratuita para portadores de Ingresso VIP.</li>
                </ul>
              </div>

            </div>

            {/* Right box: Map layout mockup / placeholder */}
            <div className="lg:col-span-7">
              <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-4 overflow-hidden relative shadow-2xl">
                
                {/* Elegant header for Map mockup */}
                <div className="flex items-center justify-between px-3 pb-3 border-b border-zinc-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    <span className="text-xs font-bold text-zinc-300">Google Maps - Curitiba</span>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Rua+Cláudio+Chatagnier+112+Bacacheri+Curitiba" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-[#FFE419] hover:underline font-bold"
                  >
                    Abrir no app de Mapas →
                  </a>
                </div>

                {/* Simulated Visual map with route elements */}
                <div className="bg-zinc-950 aspect-video rounded-2xl relative overflow-hidden flex items-center justify-center border border-zinc-800">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffe419_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Decorative curved path */}
                  <svg className="absolute inset-0 w-full h-full text-zinc-800" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 50,150 Q 200,50 350,180 T 600,100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
                  </svg>

                  {/* Curitiba map pins design */}
                  <div className="relative z-10 text-center p-6 space-y-4 max-w-sm">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#FFE419]/25 flex items-center justify-center text-[#FFE419] animate-pulse">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">CeUnina - Bacacheri</p>
                      <p className="text-xs text-zinc-400 mt-1">Rua Cláudio Chatagnier, 112, Curitiba, PR</p>
                    </div>
                    
                    <a 
                      href="https://maps.google.com/?q=Rua+Cláudio+Chatagnier+112+Bacacheri+Curitiba" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#FFE419] hover:bg-yellow-500 text-black font-extrabold text-xs px-4 py-2.5 rounded-lg uppercase tracking-wider transition-all"
                    >
                      <Locate className="h-4 w-4" /> Traçar Rota via Waze / Google
                    </a>
                  </div>

                  {/* Small floating labels */}
                  <span className="absolute top-10 left-10 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-[10px] text-zinc-400 font-mono">Terminal Boa Vista (7 min)</span>
                  <span className="absolute bottom-10 right-10 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-[10px] text-zinc-400 font-mono">Aeroporto Bacacheri (4 min)</span>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-yellow-500 py-24 text-black">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-black bg-black/10 px-3 py-1 rounded-full">DÚVIDAS FREQUENTES</span>
            <h2 className="text-3xl md:text-5xl font-black font-['Cinzel'] tracking-wide">Perguntas Frequentes</h2>
            <p className="text-black/80 font-medium">
              Tem alguma dúvida sobre o Águias Summit Elevate 2026? Confira as respostas rápidas abaixo.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-black text-white rounded-2xl border border-zinc-800 overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-zinc-950 transition-colors"
                >
                  <span className="font-extrabold text-sm md:text-base">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 text-[#FFE419] shrink-0 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`} />
                </button>

                {openFaqIndex === index && (
                  <div className="p-6 pt-0 border-t border-zinc-900 text-zinc-300 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Help Box */}
          <div className="mt-12 bg-black text-white p-8 rounded-3xl border border-zinc-800 text-center space-y-4">
            <p className="text-sm text-zinc-400">Ainda tem alguma dúvida sobre o evento ou quer fechar ingressos corporativos?</p>
            <p className="text-lg font-bold text-[#FFE419]">Nossa equipe está online para te atender agora!</p>
<a 
               href="https://wa.me/5541991889272" 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all"
              >
               <MessageCircle className="h-5 w-5 fill-current" /> Falar com Consultor no WhatsApp
             </a>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="bg-black text-zinc-500 py-12 px-4 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-lg font-black font-['Cinzel'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFE419] to-amber-500">
                  ÁGUIAS SUMMIT
                </span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">ELEVATE</span>
              </div>
              <p className="text-xs text-zinc-400">
                © 2026 Águias Summit Elevate. Todos os direitos reservados.
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                Desenvolvido de forma personalizada e elegante para a melhor experiência.
              </p>
            </div>

            <div className="flex gap-6 text-xs font-semibold text-zinc-400">
              <a href="#ingressos" className="hover:text-white transition-colors">Ingressos</a>
              <a href="#ingressos" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#ingressos" className="hover:text-white transition-colors">Políticas de Privacidade</a>
            </div>

          </div>
        </footer>
    </div>
  );
}