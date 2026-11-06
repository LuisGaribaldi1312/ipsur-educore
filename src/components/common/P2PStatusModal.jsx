import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Laptop, 
  Users, 
  BookOpen, 
  Database, 
  RefreshCw, 
  ShieldCheck, 
  X, 
  Share2, 
  HardDrive,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function P2PStatusModal() {
  const { 
    p2pModalOpen, 
    setP2PModalOpen, 
    p2pPeersCount, 
    p2pSelfId, 
    syncP2PManually,
    users,
    classrooms,
    payments,
    activities,
    showToast 
  } = useApp();

  if (!p2pModalOpen) return null;

  const handleForceSync = () => {
    syncP2PManually();
    showToast('Sincronización P2P Enviada', 'Transmitiendo estado local a todos los dispositivos conectados en la red.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] text-white relative flex-shrink-0">
          <button
            onClick={() => setP2PModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/15 p-2 flex items-center justify-center border border-white/20">
              <Share2 className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/15 px-2.5 py-0.5 rounded-full border border-white/15 text-pink-200">
                Red Descentralizada WebRTC
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Sincronización P2P entre Dispositivos
              </h2>
            </div>
          </div>
          <p className="text-xs text-indigo-100/90 leading-relaxed max-w-md">
            Todos los datos se almacenan en tu dispositivo y se sincronizan directamente de celular a computadora sin depender de servidores o bases de datos externas.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          
          {/* Realtime Status Badge */}
          <div className="p-4 rounded-2xl border bg-emerald-50/90 border-emerald-200 text-emerald-950 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <div>
                <strong className="text-sm font-bold block">
                  Red P2P Activa y Operando
                </strong>
                <span className="text-xs text-emerald-800">
                  {p2pPeersCount > 0 
                    ? `${p2pPeersCount} dispositivo(s) conectado(s) en tiempo real`
                    : 'Buscando dispositivos en la red local/remota...'}
                </span>
              </div>
            </div>

            <button
              onClick={handleForceSync}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white text-emerald-800 border border-emerald-300 rounded-xl shadow-xs hover:bg-emerald-100 transition cursor-pointer"
              title="Transmitir estado a la red"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sincronizar</span>
            </button>
          </div>

          {/* Local Storage Metrics Grid */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Almacenamiento Local en este Dispositivo
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-base font-black text-slate-900 block">{users.length}</span>
                <span className="text-[10px] text-slate-500">Usuarios</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <BookOpen className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="text-base font-black text-slate-900 block">{classrooms.length}</span>
                <span className="text-[10px] text-slate-500">Salas</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <Database className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-base font-black text-slate-900 block">{payments.length}</span>
                <span className="text-[10px] text-slate-500">Pagos</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <Sparkles className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                <span className="text-base font-black text-slate-900 block">{activities.length}</span>
                <span className="text-[10px] text-slate-500">Actividades</span>
              </div>
            </div>
          </div>

          {/* How P2P Works Guide */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 text-xs text-indigo-950 space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-ipsur-pink-600" />
              <span>¿Cómo funciona el protocolo P2P Gossip?</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-indigo-900/90 leading-relaxed list-disc list-inside">
              <li><strong>Local-First:</strong> Todos los cambios se guardan primero en la memoria segura de tu dispositivo, funcionando incluso sin internet.</li>
              <li><strong>Intercambio automático:</strong> En cuanto otro dispositivo (como tu celular) abre el portal, se conecta por WebRTC con los demás equipos activos y se transfieren las novedades en milisegundos.</li>
              <li><strong>Dispositivos apagados:</strong> Si tu celular estaba apagado, al encenderse y abrir el portal recibe todas las actividades y usuarios generados por los demás equipos.</li>
            </ul>
          </div>

          {/* Device ID */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>ID de Nodo WebRTC:</span>
            <span className="font-bold text-slate-700 truncate max-w-[200px]">{p2pSelfId || 'Iniciando...'}</span>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={() => setP2PModalOpen(false)}
              className="px-5 py-2 text-xs font-bold text-white bg-ipsur-navy-700 hover:bg-ipsur-navy-800 rounded-xl shadow transition cursor-pointer"
            >
              Entendido
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
