import "./styles.sass";

export default function ContactModal() {
    return (
        <div className="modal">
            <div className="modal_content">
                <header className="modal_header">
                    <h1 className="modal_title">Contatos</h1>
                </header>
                <section className="modal_content">
                    <p><b>Email:</b> felipe_ntakiguchi@hotmail.com</p>
                    <p><b>Telefone:</b> (41) 99221-3693</p>
                </section>
            </div>
        </div>
    );
}