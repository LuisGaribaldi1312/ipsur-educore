import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cloud, 
  CloudOff, 
  CheckCircle2, 
  X, 
  Key, 
  Sparkles, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function FirebaseConfigModal() {
  const { 
    firebaseModalOpen, 
    setFirebaseModalOpen, 
    isFirebaseConfigured, 
    firebaseConfig, 
    saveFirebaseConfig,
    showToast 
  } = useApp();

  const [rawConfigText, setRawConfigText] = useState('');
  const [projectId, setProjectId] = useState(firebaseConfig?.projectId || '');
  const [apiKey, setApiKey] = useState(firebaseConfig?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(firebaseConfig?.authDomain || '');
  const [activeTab, setActiveTab] = useState('auto'); // 'auto' | 'manual'

  if (!firebaseModalOpen) return null;

  // Auto parser for pasted Firebase Config snippet
  const handleAutoParseAndSave = (e) => {
    e.preventDefault();
    if (!rawConfigText.trim()) {
      showToast('Campo vacío', 'Por favor pega el código de configuración de Firebase.', 'error');
      return;
    }

    try {
      const text = rawConfigText;
      // Extract fields with regex
      const extractField = (fieldName) => {
        const regex = new RegExp(`${fieldName}["']?\\s*:\\s*["']([^"']+)["']`, 'i');
        const match = text.match(regex);
        return match ? match[1] : '';
      };

      const extractedApiKey = extractField('apiKey');
      const extractedProjectId = extractField('projectId');
      const extractedAuthDomain = extractField('authDomain') || (extractedProjectId ? `${extractedProjectId}.firebaseapp.com` : '');
      const extractedStorageBucket = extractField('storageBucket') || (extractedProjectId ? `${extractedProjectId}.firebasestorage.app` : '');
      const extractedMessagingSenderId = extractField('messagingSenderId');
      const extractedAppId = extractField('appId');

      if (!extractedProjectId || !extractedApiKey) {
        showToast(
          'Formato Inválido',
          'No se pudo encontrar apiKey o projectId en el texto pegado. Verifica copiar el bloque firebaseConfig completo.',
          'error'
        );
        return;
      }

      const newConfig = {
        apiKey: extractedApiKey,
        authDomain: extractedAuthDomain,
        projectId: extractedProjectId,
        storageBucket: extractedStorageBucket,
        messagingSenderId: extractedMessagingSenderId,
        appId: extractedAppId
      };

      saveFirebaseConfig(newConfig);
      showToast('¡Firebase Conectado!', 'La base de datos en tiempo real ha sido enlazada con éxito.', 'success');
      setFirebaseModalOpen(false);
    } catch (err) {
      showToast('Error', 'No se pudo procesar la configuración: ' + err.message, 'error');
    }
  };

  const handleManualSave = (e) => {
    e.preventDefault();
    if (!projectId.trim() || !apiKey.trim()) {
      showToast('Campos requeridos', 'Ingresa al menos el Project ID y API Key de Firebase.', 'error');
      return;
    }

    const newConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      projectId: projectId.trim(),
      storageBucket: `${projectId.trim()}.firebasestorage.app`,
      messagingSenderId: '',
      appId: ''
    };

    saveFirebaseConfig(newConfig);
    showToast('¡Firebase Conectado!', 'La base de datos en tiempo real ha sido enlazada con éxito.', 'success');
    setFirebaseModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0A0D1B] via-[#141B41] to-[#750042] text-white relative flex-shrink-0">
          <button
            onClick={() => setFirebaseModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/15 p-2 flex items-center justify-center border border-white/20">
              <Cloud className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/15 px-2.5 py-0.5 rounded-full border border-white/15 text-pink-200">
                Sincronización en la Nube
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Vincular Firebase Firestore
              </h2>
            </div>
          </div>
          <p className="text-xs text-indigo-100/90 leading-relaxed max-w-md">
            Conecta la base de datos centralizada de Google Firebase para que todas las computadoras, celulares y tablets se sincronicen en tiempo real.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Status Capsule */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            isFirebaseConfigured 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 animate-pulse ${
                isFirebaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              <div>
                <strong className="text-xs sm:text-sm font-bold block">
                  {isFirebaseConfigured ? 'Sincronización en Tiempo Real Activa' : 'Modo Almacenamiento Local (Sin Nube)'}
                </strong>
                <span className="text-[11px] opacity-80 block">
                  {isFirebaseConfigured 
                    ? `Proyecto conectado: ${firebaseConfig?.projectId}` 
                    : 'Los datos solo se guardan en este dispositivo hasta que vincules Firebase'}
                </span>
              </div>
            </div>

            {isFirebaseConfigured && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conectado
              </span>
            )}
          </div>

          {/* Quick Step Guide */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ipsur-pink-500" />
              <span>¿Cómo obtener las credenciales de Firebase en 1 minuto?</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Entra a tu cuenta en <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-ipsur-navy-700 font-bold underline inline-flex items-center gap-0.5">console.firebase.google.com <ExternalLink className="w-3 h-3" /></a>.</li>
              <li>Abre tu proyecto (o crea uno llamado <strong>ipsur-educore</strong>) y activa <strong>Firestore Database</strong> en modo prueba.</li>
              <li>En la vista general del proyecto, haz clic en el ícono web <strong>&lt;/&gt;</strong> (Añadir app) y copia el bloque <code>const firebaseConfig = &#123; ... &#125;</code>.</li>
              <li>Pega el código aquí abajo y haz clic en <strong>"Guardar y Conectar"</strong>.</li>
            </ol>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('auto')}
              className={`py-2 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'auto'
                  ? 'border-ipsur-pink-600 text-ipsur-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Pegar Bloque Completo (Fácil)
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`py-2 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'manual'
                  ? 'border-ipsur-pink-600 text-ipsur-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Ingreso Manual
            </button>
          </div>

          {/* Tab 1: Paste full block */}
          {activeTab === 'auto' && (
            <form onSubmit={handleAutoParseAndSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pega aquí el código que te da Firebase:
                </label>
                <textarea
                  value={rawConfigText}
                  onChange={(e) => setRawConfigText(e.target.value)}
                  placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "ipsur-educore.firebaseapp.com",\n  projectId: "ipsur-educore",\n  storageBucket: "...",\n  messagingSenderId: "...",\n  appId: "..."\n};`}
                  rows={6}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFirebaseModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-700 hover:to-rose-700 rounded-xl shadow-md transition"
                >
                  Guardar y Conectar en Tiempo Real
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Manual Input */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project ID:
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="ipsur-educore"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  API Key:
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Auth Domain (Opcional):
                </label>
                <input
                  type="text"
                  value={authDomain}
                  onChange={(e) => setAuthDomain(e.target.value)}
                  placeholder="ipsur-educore.firebaseapp.com"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ipsur-pink-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setFirebaseModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-ipsur-pink-600 to-rose-600 hover:from-ipsur-pink-700 hover:to-rose-700 rounded-xl shadow-md transition"
                >
                  Guardar Credenciales
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
