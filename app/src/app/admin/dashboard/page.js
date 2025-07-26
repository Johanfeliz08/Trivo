"use client";
import SearchBar from "@/components/ui/Admin/Dashboard/SearchBar";
import SmallWidget from "@/components/ui/Admin/Dashboard/SmallWidget";
import TableWidget from "@/components/ui/Admin/Dashboard/TableWidget";

export default function dashboardPage() {
  const userIcon = (
    <svg className={`size-5 fill-primary`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
      <path d="m17.979,23.359c.078.265-.073.542-.339.62-.047.014-.094.021-.141.021-.217,0-.416-.141-.479-.359-.631-2.144-2.695-3.641-5.021-3.641s-4.39,1.497-5.021,3.641c-.077.266-.357.416-.62.339-.266-.078-.417-.355-.339-.62.754-2.567,3.213-4.359,5.979-4.359s5.226,1.792,5.979,4.359Zm6-9c-.754-2.567-3.213-4.359-5.979-4.359-.276,0-.5.224-.5.5s.224.5.5.5c2.325,0,4.39,1.497,5.021,3.641.063.219.263.359.479.359.047,0,.094-.007.141-.021.266-.078.417-.355.339-.62Zm-17.479-3.859c0-.276-.224-.5-.5-.5C3.233,10,.774,11.792.021,14.359c-.078.265.073.542.339.62.047.014.094.021.141.021.217,0,.416-.141.479-.359.631-2.144,2.695-3.641,5.021-3.641.276,0,.5-.224.5-.5Zm5.5-1.5c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm-3,4c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Zm5-9c0-2.206,1.794-4,4-4s4,1.794,4,4-1.794,4-4,4-4-1.794-4-4Zm1,0c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Zm-13,0C2,1.794,3.794,0,6,0s4,1.794,4,4-1.794,4-4,4-4-1.794-4-4Zm1,0c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Z" />
    </svg>
  );

  const contractsIcon = (
    <svg className={`size-5 fill-primary`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="m11.851,10.356l-3.362,3.305c-.226.226-.523.339-.821.339s-.598-.114-.826-.342l-1.7-1.741c-.193-.197-.189-.514.009-.707.198-.192.515-.189.707.009l1.695,1.736c.051.05.176.051.231-.004l3.365-3.308c.197-.194.513-.191.707.006.194.197.191.514-.006.707Zm5.649,7.644h-7c-.276,0-.5.224-.5.5s.224.5.5.5h7c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Zm0-13h-7c-.276,0-.5.224-.5.5s.224.5.5.5h7c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Zm0,6.5h-4c-.276,0-.5.224-.5.5s.224.5.5.5h4c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Zm-10.5,6c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm0-11c.552,0,1-.448,1-1s-.448-1-1-1-1,.448-1,1,.448,1,1,1Zm15-2v15c0,2.481-2.019,4.5-4.5,4.5H6.5c-2.481,0-4.5-2.019-4.5-4.5V4.5C2,2.019,4.019,0,6.5,0h11c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5H6.5c-1.93,0-3.5,1.57-3.5,3.5v15c0,1.93,1.57,3.5,3.5,3.5h11c1.93,0,3.5-1.57,3.5-3.5V4.5Z" />
    </svg>
  );

  const matchesIcon = (
    <svg className={`size-5 fill-primary`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="M24,15.5c0,.276-.224,.5-.5,.5h-1.167c-.752,0-1.498,.248-2.1,.7l-6.092,4.568c-.628,.488-1.383,.733-2.14,.733s-1.518-.246-2.15-.739l-6.085-4.562c-.602-.452-1.348-.7-2.1-.7H.5c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5H1.667c.968,0,1.926,.319,2.699,.899l6.092,4.568c.91,.71,2.173,.707,3.077,.006l6.099-4.574c.215-.161,.444-.301,.684-.421l-7.279-5.458-1.311,1.255c-.464,.464-1.098,.725-1.759,.725-.853,0-1.604-.447-2.039-1.051-.703-.976-.555-2.392,.347-3.293l3.029-2.852-.986-.898c-1.066-.97-2.731-1.143-3.936-.539l-2.315,1.158c-.622,.311-1.318,.475-2.013,.475H.5c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h1.556c.54,0,1.082-.128,1.565-.369l2.315-1.158c.617-.31,1.31-.473,2.003-.473,1.155,0,2.227,.415,3.054,1.167l1.042,.95,.955-.899c1.339-1.26,3.437-1.565,5.073-.745l2.315,1.158c.483,.241,1.025,.369,1.565,.369h1.556c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5h-1.556c-.694,0-1.391-.164-2.013-.475l-2.315-1.158c-1.272-.638-2.901-.4-3.94,.579l-4.703,4.428c-.548,.548-.651,1.408-.231,1.991,.267,.37,.659,.594,1.105,.63,.436,.032,.87-.122,1.182-.435l4.165-3.987c.199-.191,.516-.184,.707,.016,.19,.199,.184,.516-.016,.707l-2.113,2.023,7.691,5.768c.286-.057,.578-.087,.871-.087h1.167c.276,0,.5,.224,.5,.5Z" />
    </svg>
  );

  const reportsIcon = (
    <svg className={`size-5 fill-primary`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
      <path d="m5.882,15H.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h5.382c.191,0,.362-.106.447-.276l1.048-2.096c.209-.419.627-.664,1.098-.639.468.025.86.312,1.024.75l1.939,5.17c.03.081.093.101.14.103.054.003.112-.01.15-.087l1.048-2.096c.256-.511.77-.829,1.342-.829h4.382c.276,0,.5.224.5.5s-.224.5-.5.5h-4.382c-.191,0-.362.106-.447.276l-1.048,2.096c-.2.399-.592.641-1.033.641-.021,0-.043,0-.064-.002-.468-.025-.86-.312-1.024-.75l-1.939-5.17c-.03-.081-.093-.101-.14-.103-.049.005-.112.011-.15.087l-1.048,2.096c-.256.511-.77.829-1.342.829Zm16.118-5.015v9.515c0,2.481-2.019,4.5-4.5,4.5H6.5c-2.481,0-4.5-2.019-4.5-4.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2c0,1.93,1.57,3.5,3.5,3.5h11c1.93,0,3.5-1.57,3.5-3.5v-9.515c0-.335-.038-.663-.096-.985h-5.404c-1.378,0-2.5-1.122-2.5-2.5V1.096c-.323-.058-.651-.096-.985-.096h-5.515c-1.93,0-3.5,1.57-3.5,3.5v7c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-7C2,2.019,4.019,0,6.5,0h5.515c1.736,0,3.369.676,4.596,1.904l3.485,3.485c1.228,1.228,1.904,2.86,1.904,4.596Zm-1.379-1.985c-.273-.704-.682-1.354-1.231-1.904l-3.485-3.485c-.55-.55-1.2-.959-1.904-1.231v5.121c0,.827.673,1.5,1.5,1.5h5.121Z" />
    </svg>
  );

  // Ultimos matches table

  const ultimosMatches = {
    columns: ["Consultar", "Match Id", "Reclutador", "Experto", "Fecha"],
    rows: ["matchId", "reclutador", "experto", "fecha"],
    data: [
      {
        matchId: "1asc-1231s-casd-123",
        reclutador: "Juan Pérez",
        experto: "María López",
        fecha: "2023-08-01",
      },
      {
        matchId: "2asc-1231s-casd-123",
        reclutador: "Ana Gómez",
        experto: "Luis Martínez",
        fecha: "2023-08-02",
      },
      {
        matchId: "3asc-1231s-casd-123",
        reclutador: "Carlos Sánchez",
        experto: "Laura Fernández",
        fecha: "2023-08-03",
      },
      {
        matchId: "4asc-1231s-casd-123",
        reclutador: "Sofía Torres",
        experto: "Pedro Ramírez",
        fecha: "2023-08-04",
      },
      {
        matchId: "5asc-1231s-casd-123",
        reclutador: "Diego Ruiz",
        experto: "Clara Jiménez",
        fecha: "2023-08-05",
      },
      {
        matchId: "5asc-1231s-casd-222",
        reclutador: "Diego Arias",
        experto: "Clara Jiménez",
        fecha: "2023-08-05",
      },
    ],
  };

  const ultimosBaneos = {
    columns: ["Consultar", "Match Id", "Reclutador", "Experto", "Fecha"],
    rows: ["matchId", "reclutador", "experto", "fecha"],
    data: [
      {
        matchId: "1asc-1231s-casd-123",
        reclutador: "Juan Pérez",
        experto: "María López",
        fecha: "2023-08-01",
      },
      {
        matchId: "2asc-1231s-casd-123",
        reclutador: "Ana Gómez",
        experto: "Luis Martínez",
        fecha: "2023-08-02",
      },
      {
        matchId: "3asc-1231s-casd-123",
        reclutador: "Carlos Sánchez",
        experto: "Laura Fernández",
        fecha: "2023-08-03",
      },
      {
        matchId: "4asc-1231s-casd-123",
        reclutador: "Sofía Torres",
        experto: "Pedro Ramírez",
        fecha: "2023-08-04",
      },
      {
        matchId: "5asc-1231s-casd-123",
        reclutador: "Diego Ruiz",
        experto: "Clara Jiménez",
        fecha: "2023-08-05",
      },
    ],
  };

  return (
    <>
      <div className="dashboardPage flex flex-col gap-6 h-full w-full px-12 pt-10 z-10">
        <SearchBar />
        <div className="pageHeader flex flex-row justify-between items-center">
          <div className="title flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-xl flex flex-row gap-2">
              Bienvenid@
              <span className="text-primary font-regular">Johan Feliz</span>
            </p>
          </div>
          <div className="filters-container">
            <div className="filter bg-white rounded-2xl px-5 py-2 shadow-md border border-gray-300 flex flex-row justify-between items-center gap-2">
              <div className="icon">
                <svg className="size-5 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M10.5,13h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M14.5,13h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M18.5,13h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M10.5,18h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M6.5,13h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M6.5,18h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M14.5,18h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M18.5,18h-1c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h1c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                  <path d="M19.5,2h-1.5V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H7V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5h-1.5C2.019,2,0,4.019,0,6.5v13c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V6.5c0-2.481-2.019-4.5-4.5-4.5ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5Zm15,20H4.5c-1.93,0-3.5-1.57-3.5-3.5V9H23v10.5c0,1.93-1.57,3.5-3.5,3.5Z" />
                </svg>
              </div>
              <select name="filterbyTime" id="filterbyTime" className="">
                <option value="last24hours">Últimas 24 horas</option>
                <option value="last7days">Últimos 7 días</option>
                <option value="last30days">Últimos 30 días</option>
              </select>
            </div>
          </div>
        </div>
        <div className="content flex flex-col gap-6 w-full">
          <div className="small-widgets grid grid-rows-1 grid-cols-4 gap-4 w-full">
            <SmallWidget icon={userIcon} title="Usuarios online" value="12,234" percentageChange="12%" valueType={"positive"} />
            <SmallWidget icon={contractsIcon} title="Contratos realizados" value="250" percentageChange="25%" valueType={"negative"} />
            <SmallWidget icon={matchesIcon} title="Matches realizados" value="1,500" percentageChange="5%" valueType={"positive"} />
            <SmallWidget icon={reportsIcon} title="Reportes de usuarios" value="100" percentageChange="1%" valueType={"positive"} />
          </div>
          <div className="charts grid grid-cols-2 gap-4 w-full pb-15">
            <TableWidget title="Ultimos matches" data={ultimosMatches} />
            <TableWidget title="Ultimos baneos" data={ultimosBaneos} />
          </div>
        </div>
      </div>
    </>
  );
}
