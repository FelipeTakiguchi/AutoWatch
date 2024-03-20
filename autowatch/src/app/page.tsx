import HeaderComponent from "@/components/header/header";
import Pagination from "@/components/pagination/pagination";
import Table from "@/components/TableComponent/table";
import "./styles.sass"

export default function Home() {
  return (
    <>
      <HeaderComponent />
      <main>
        <Table/>
      </main>
      <nav className="centralize_bottom">
        <Pagination/>
      </nav>
    </>
  );
}
