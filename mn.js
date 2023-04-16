const prompt = require('prompt-sync')();
const venom = require('venom-bot');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const fs = require('fs');
const path = require('path');

// -------------------------------------------------------------------------------------------------

venom.create({ session: 'ls_mn', multidevice: true })
    .then(async (client) => {
        const contactsFilePath = './contacts.json';
        const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf-8'));
        let messagesToSend = contacts.length;
        const messageType = prompt('Escolha o tipo de mensagem (1. Texto  2. Áudio  3. Imagem  4. Vídeo  5. Link  6. Arquivos)  ');

        // -------------------------------------------------------------------------------------------------

        let textoMensagem = "\n\n_Caro(a) amigo(a),_\n\nConfira mais uma importante ação do meu mandato.  👆👆👆\n\n" +
            "Meu objetivo é manter você sempre informado e envolvido para promover uma política mais participativa. " +
            "Estou comprometido em trabalhar incansavelmente para melhorar a política da nossa cidade, " +
            "lutando para que suas necessidades e demandas sejam ouvidas e atendidas.\n\n\n" +
            "Qualquer dúvida é só chamar: \n📱 (11) 99892-7372 (WhatsApp)\n\n" +
            "Para ficar por dentro de mais assuntos me acompanhe nas redes sociais:\n\n" +
            "🌐 youtube.com/@vereadorisaquemessias2389\n" +
            "🌐 fb.com/watch/isaquemessiassantos\n" +
            "🌐 instagram.com/isaquemessiassantos\n\n" +
            "_Um forte abraço a todos_ 🤗\n\n" +
            "*VEREADOR ISAQUE*"

        // -------------------------------------------------------------------------------------------------

        switch (messageType) {
            case '1':
                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendText(`55${contact.telefone}@c.us`, textoMensagem)
                        .then((result) => {
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;

            // -------------------------------------------------------------------------------------------------

            case '2':
                const audioFilePath = prompt('Digite o nome do arquivo (sem a extensão .mp3):');
                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendVoice(`55${contact.telefone}@c.us`, `./audios/${audioFilePath}.mp3`)

                        .then((result) => {
                            client.sendText(`55${contact.telefone}@c.us`, textoMensagem)
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;

            // -------------------------------------------------------------------------------------------------

            case '3':
                const imagem = prompt('Digite o nome do arquivo (sem a extensão .png): ');
                const caminhoImagem = path.join(__dirname, 'imagens', `${imagem}.png`);

                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendImage(`55${contact.telefone}@c.us`, caminhoImagem, '', textoMensagem)
                        .then((result) => {
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;

            // -------------------------------------------------------------------------------------------------

            case '4':

                const video = prompt('Digite o nome do arquivo (sem a extensão .mp4): ');
                const caminhoVideo = path.join(__dirname, 'videos', `${video}.mp4`);

                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendVideoAsGif(`55${contact.telefone}@c.us`, caminhoVideo, '', textoMensagem)
                        .then((result) => {
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;

            // -------------------------------------------------------------------------------------------------

            case '5':
                const linkURL = prompt('Digite a URL: ');
                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendLinkPreview(`55${contact.telefone}@c.us`, linkURL, textoMensagem)
                        .then((result) => {
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;

            // -------------------------------------------------------------------------------------------------
            case '6':
                const file = prompt('Digite o nome do arquivo (sem a extensão .pdf): ');
                const caminhoFile = path.join(__dirname, 'arquivos', `${file}.pdf`);

                for (const contact of contacts) {
                    await sleep(8000);
                    client.sendFile(`55${contact.telefone}@c.us`, caminhoFile, '', textoMensagem)
                        .then((result) => {
                            console.log(`[Enviada] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        })
                        .catch((error) => {
                            console.error(`[Erro ao enviar] para ${contact.telefone}`);
                            messagesToSend--;
                            console.log(` -- ${messagesToSend} --`)
                        });
                }
                break;
            default:
                console.log('Tipo de mensagem inválido');

        }
    })
    .catch((error) => console.error(error));
