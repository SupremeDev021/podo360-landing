import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Footprints,
  Layers3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Users
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitLead, type LeadPayload } from "./services/leadService";

const clinicAppUrl = import.meta.env.VITE_CLINIC_APP_URL || "http://localhost:5173";
const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/5500000000000";

const modules = [
  "BA",
  "Atendimentos",
  "ProntuárioÚnico",
  "Anamnese",
  "Pé 3D",
  "Agenda",
  "Financeiro",
  "Estoque",
  "Relatórios",
  "White Label",
  "Gerenciamento de Atendimento"
];

const benefits = [
  {
    icon: ClipboardList,
    title: "Fluxo clínico organizado",
    description: "BA, atendimento, anamnese e evolução do paciente em uma jornada clara para a equipe."
  },
  {
    icon: Footprints,
    title: "Podologia no centro",
    description: "Recursos pensados para curativos, sensibilidade, imagens, prontuário e acompanhamento podológico."
  },
  {
    icon: ShieldCheck,
    title: "Base preparada para segurança",
    description: "Arquitetura multiempresa, isolamento por clínica e integração planejada com Supabase e RLS."
  },
  {
    icon: BarChart3,
    title: "Gestão além do atendimento",
    description: "Agenda, financeiro, estoque, produtos e relatórios para apoiar a operação da clínica."
  }
];

const faqs = [
  {
    question: "A Podo360 é indicada para quais clínicas?",
    answer: "Para clínicas de podologia que precisam organizar atendimento, prontuário, evolução clínica, agenda e gestão operacional."
  },
  {
    question: "A Landing acessa dados clínicos?",
    answer: "Não. Esta página apenas apresenta a solução e capta interesse comercial. Dados clínicos ficam no Sistema Clínica."
  },
  {
    question: "Os planos já têm valores definidos?",
    answer: "Não. A estrutura de planos está preparada para o futuro, mas os valores comerciais ainda serão definidos."
  }
];

function emptyLead(): LeadPayload {
  return {
    name: "",
    clinicName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    source: "podo360-landing"
  };
}

export function App() {
  const [lead, setLead] = useState<LeadPayload>(() => emptyLead());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function updateLead(field: keyof LeadPayload, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lead.name.trim() || !lead.clinicName.trim() || !lead.email.trim() || !lead.phone.trim()) {
      setStatus("error");
      setFeedback("Preencha nome, clínica, e-mail e telefone para solicitar contato.");
      return;
    }

    setStatus("loading");
    setFeedback("Enviando seus dados...");

    try {
      const result = await submitLead(lead);
      setStatus("success");
      setFeedback(
        result.offline
          ? "Recebemos sua solicitação localmente. A integração com leads será ativada na próxima fase."
          : "Solicitação enviada. A equipe Podo360 entrará em contato."
      );
      setLead(emptyLead());
    } catch {
      setStatus("error");
      setFeedback("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Podo360">
          <span><Footprints size={24} /></span>
          <strong>Podo360</strong>
        </a>
        <nav className="site-nav" aria-label="Principal">
          <a href="#modules">Módulos</a>
          <a href="#demo">Demonstração</a>
          <a href="#plans">Planos</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="ghost-link" href={clinicAppUrl}>Entrar no sistema</a>
      </header>

      <section className="hero" id="top">
        <div className="hero__content">
          <span className="eyebrow"><Sparkles size={16} /> Para clínicas de podologia</span>
          <h1>Gestão clínica e operacional para podologia em uma única plataforma.</h1>
          <p>
            A Podo360 organiza BA, atendimentos, ProntuárioÚnico, anamnese, Pé 3D, agenda,
            financeiro, estoque, relatórios e administração da clínica com uma experiência simples e profissional.
          </p>
          <div className="hero__actions">
            <a className="primary-action" href="#lead-form">Solicitar demonstração <ArrowRight size={18} /></a>
            <a className="secondary-action" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
          </div>
          <div className="trust-row">
            <span><CheckCircle2 size={16} /> Multiempresa por arquitetura</span>
            <span><CheckCircle2 size={16} /> Preparado para Supabase/RLS</span>
            <span><CheckCircle2 size={16} /> Foco em podologia</span>
          </div>
        </div>

        <div className="hero-card" aria-label="Resumo visual da plataforma">
          <div className="hero-card__top">
            <span>Atendimento em andamento</span>
            <strong>BA 2026-0018</strong>
          </div>
          <div className="clinical-preview">
            <div className="foot-preview"><Footprints size={78} /></div>
            <div>
              <strong>Sensibilidade Monofilamento</strong>
              <p>Regiões do pé, histórico, evolução e registro clínico em um fluxo guiado.</p>
            </div>
          </div>
          <div className="mini-grid">
            <span><Activity size={17} /> Anamnese</span>
            <span><CalendarDays size={17} /> Agenda</span>
            <span><Store size={17} /> Estoque</span>
            <span><Layers3 size={17} /> Curativos</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Benefícios</span>
          <h2>Uma base para a clínica operar com mais clareza.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article className="benefit-card" key={title}>
              <span><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" id="modules">
        <div className="section-heading">
          <span className="eyebrow">Módulos</span>
          <h2>Recursos preparados para a rotina podológica.</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => <span key={module}>{module}</span>)}
        </div>
      </section>

      <section className="split-section" id="demo">
        <div>
          <span className="eyebrow"><Stethoscope size={16} /> Demonstração</span>
          <h2>Apresente o fluxo completo para sua equipe.</h2>
          <p>
            A demonstração mostra como a clínica pode abrir BA, acompanhar atendimentos,
            registrar anamnese, salvar curativos e visualizar evolução clínica sem misturar
            a operação da clínica com a gestão comercial da plataforma.
          </p>
          <a className="primary-action" href="#lead-form">Quero conhecer <ArrowRight size={18} /></a>
        </div>
        <div className="timeline-card">
          <span>Fluxo sugerido</span>
          <ol>
            <li>Paciente chega e o BA é aberto.</li>
            <li>Profissional inicia atendimento e anamnese.</li>
            <li>Registra Pé 3D, curativos, imagens e evolução.</li>
            <li>Finaliza atendimento com histórico preservado.</li>
          </ol>
        </div>
      </section>

      <section className="section" id="plans">
        <div className="section-heading">
          <span className="eyebrow">Planos</span>
          <h2>Estrutura preparada para planos futuros.</h2>
          <p>Os valores ainda não estão definidos. A equipe Podo360 apresentará as opções comerciais após a demonstração.</p>
        </div>
        <div className="plan-card">
          <strong>Planos sob consulta</strong>
          <p>Agenda uma conversa para entender módulos, quantidade de usuários, implantação e necessidades da clínica.</p>
        </div>
      </section>

      <section className="lead-section" id="lead-form">
        <div>
          <span className="eyebrow"><Users size={16} /> Contato comercial</span>
          <h2>Solicite uma demonstração da Podo360.</h2>
          <p>Preencha os dados e a equipe entrará em contato para apresentar a plataforma.</p>
        </div>
        <form className="lead-form" onSubmit={handleLeadSubmit}>
          <label>Nome<input value={lead.name} onChange={(event) => updateLead("name", event.target.value)} placeholder="Seu nome" /></label>
          <label>Clínica<input value={lead.clinicName} onChange={(event) => updateLead("clinicName", event.target.value)} placeholder="Nome da clínica" /></label>
          <label>E-mail<input type="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} placeholder="contato@clinica.com" /></label>
          <label>Telefone<input value={lead.phone} onChange={(event) => updateLead("phone", event.target.value)} placeholder="(00) 00000-0000" /></label>
          <label>Cidade<input value={lead.city} onChange={(event) => updateLead("city", event.target.value)} placeholder="Cidade/UF" /></label>
          <label>Mensagem<textarea value={lead.message} onChange={(event) => updateLead("message", event.target.value)} placeholder="Conte rapidamente o que sua clínica precisa" /></label>
          {feedback && <div className={`form-feedback form-feedback--${status}`}>{feedback}</div>}
          <button className="primary-action" disabled={status === "loading"} type="submit">
            {status === "loading" ? "Enviando..." : "Solicitar demonstração"} <ArrowRight size={18} />
          </button>
        </form>
      </section>

      <section className="section section--muted" id="faq">
        <div className="section-heading">
          <span className="eyebrow">FAQ</span>
          <h2>Dúvidas frequentes.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <strong>Podo360</strong>
        <span>Gestão para clínicas de podologia.</span>
        <a href={clinicAppUrl}>Entrar no sistema</a>
      </footer>
    </main>
  );
}
