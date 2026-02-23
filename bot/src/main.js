// bloquear logs internos
require("./utils/filterLogs")();

// baileys
const P = require("pino");
const {
  default: makeWASocket,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} = require("baileys");

// módulos itnernos
const { getAuthState } = require("./auth");
const eventsConfig = require("./events");

// cache para controle interno do baileys
const { NodeCache } = require("@cacheable/node-cache");
const msgRetryCounterCache = new NodeCache();

//server
const setupServer = require("./server");

async function startSock() {
  const { state, saveCreds } = await getAuthState();
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(
    `💻 versão do websocket v${version[0]}.${version[1]}\n💻 última versão: ${
      isLatest == true ? "sim" : "não"
    }`
  );

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys),
    },
    msgRetryCounterCache,
    generateHighQualityLinkPreview: true,
    logger: P({ level: "silent" }),
  });
  setupServer(sock);
  eventsConfig(sock, saveCreds);

  sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      
      if (connection === 'close') {
          const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401;
          console.log('🔄 Conexão fechada devido a:', lastDisconnect.error, '. Reconectando:', shouldReconnect);
          
          // Reconecta se não for erro de logoff (401)
          if (shouldReconnect) {
              startSock();
          }
      } else if (connection === 'open') {
          console.log('✅ Bot conectado com sucesso!');
      }
  });
}

module.exports = startSock; // necessário reiniciar caso a conexão caia (não apagar)

if (require.main === module) {
  startSock();
}
