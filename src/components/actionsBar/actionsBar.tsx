import Filter from "../filter/filter";
import Select from "../select/select";
import "./styles.sass";

export default function ActionBar({ setFilter, selectedStatus, handleStatusChange }: { setFilter: any, selectedStatus: any, handleStatusChange: any}) {
    return (
        <section className="actions_bar">
            <Filter />
            <Select />
        </section>
    );
}