import "../styles.sass";

export default function ContactModal() {
    const mobileNumber = "+41 99221-3693";
    const message = "message test";

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
                    <p className="modal_text"><b>Email:</b> felipe_ntakiguchi@hotmail.com</p>
                    <p className="modal_text"><b>Telefone:</b> (41) 99221-3693</p>
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