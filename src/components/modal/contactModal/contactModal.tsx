import useClientStore from "@/services/clientStore";
import "../styles.sass";

export default function ContactModal() {
    const { clients, expandedRow} = useClientStore();
    let mobileNumber = clients[expandedRow!] ? clients[expandedRow!].number : "";
    let email = clients[expandedRow!] ? clients[expandedRow!].email : "";

    function formatPhoneNumber(number: string) {
        const phoneNumber = number.toString();
        const countryCode = "+" + phoneNumber.slice(0, 2);
        const firstPart = phoneNumber.slice(2, 7);
        const secondPart = phoneNumber.slice(7);
        
        return `${countryCode} ${firstPart}-${secondPart}`;
    }
    
    const message = "Olá Hemerson! Recebemos uma notificação de um possível acidente envolvendo você/seu veículo. Gostariamos de saber se está tudo bem com você e se há necessidade de assistência médica ou dos bombeiros.";
    // console.log(mobileNumber)
    mobileNumber = formatPhoneNumber(mobileNumber);

    const onSubmit = () => {
        // Regex expression to remove all characters which are NOT alphanumeric 
        let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
        // Appending the phone number to the URL
        let url = `https://web.whatsapp.com/send?phone=${number}`;
        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI(message)}&app_absent=0`;
        // Open our newly created URL in a new tab to send the message
        window.open(url, "_blank");
    };

    return (
        <div className="modal">
            <div>
                <header className="modal_header">
                    <h1 className="modal_title">Contatos</h1>
                </header>
                <section className="modal_content">
                    <p className="modal_text"><b>Email:</b> {email}</p>
                    <p className="modal_text"><b>Telefone:</b> {mobileNumber}</p>
                    <div className="centralize">
                        <button className="modal_contact_button" onClick={() => onSubmit()}>
                            <p className="text_button">
                                Enviar Mensagem
                            </p>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}