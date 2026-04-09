import { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    q: '¿Qué es el número de guía?',
    a: 'Es el código único que identifica tu envío dentro del sistema CAEX. Lo recibes al momento de despachar tu paquete con Cargo Expreso. Tiene el formato CAEX-XXX.',
  },
  {
    q: '¿Qué significa "Retenido en Aduana"?',
    a: 'Tu paquete está siendo revisado por las autoridades aduaneras. Puede ocurrir por declaración de contenido, valor del paquete o documentación incompleta. Contáctanos para ayudarte a gestionar la liberación.',
  },
  {
    q: '¿Cuáles son sus horarios de atención?',
    a: 'Lunes a Viernes de 8:00 a.m. a 6:00 p.m. y Sábados de 8:00 a.m. a 3:00 p.m.',
  },
  {
    q: '¿Cómo puedo contactarlos?',
    a: 'PBX Guatemala: 1776 · WhatsApp: +502 2474-4444 · Correo: consultasweb@caexlogistics.com',
  },
  {
    q: '¿Llegan a mi ubicación?',
    a: 'Cargo Expreso tiene presencia en toda Centroamérica, Estados Unidos y el resto del mundo. Contamos con Agencias y Puntos Expreso para que siempre estemos cerca de ti.',
  },
  {
    q: '¿Ofrecen servicio internacional?',
    a: 'Sí. Ofrecemos Paquetería Nacional, Servicio Internacional y Cobro Contra Entrega (COD). Sin importar el destino, tu paquete llega, y llega bien.',
  },
  {
    q: 'Mi paquete no aparece en el sistema',
    a: 'Verifica que el número de guía esté escrito correctamente. Si acabas de despachar, puede tomar hasta 24 horas en reflejarse. Si el problema persiste, contáctanos al 1776 o por WhatsApp.',
  },
  {
    q: 'El estado no ha cambiado en varios días',
    a: 'Algunos destinos tienen actualizaciones menos frecuentes. Si llevan más de 5 días hábiles sin cambio, comunícate con nuestro equipo de soporte con tu número de guía a la mano.',
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-gray-700 group-hover:text-brand transition-colors leading-snug">
          {q}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-gray-500 leading-relaxed pb-4 pr-6">{a}</p>
      </div>
    </div>
  );
}

interface FAQPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function FAQPanel({ open, onClose }: FAQPanelProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/25 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Ayuda</p>
            <p className="text-base font-semibold text-brand">Preguntas frecuentes</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {QUESTIONS.map((item) => (
            <AccordionItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">¿Necesitas más ayuda?</p>
          <p className="text-sm text-gray-600">
            PBX: <span className="font-semibold text-brand">1776</span>
            &nbsp;·&nbsp;
            WhatsApp: <span className="font-semibold text-brand">+502 2474-4444</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">Lun–Vie 8:00–18:00 · Sáb 8:00–15:00</p>
        </div>
      </aside>
    </>
  );
}
