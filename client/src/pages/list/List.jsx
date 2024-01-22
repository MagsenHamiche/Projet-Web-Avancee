// Importation des fichiers de style, composants React et bibliothèques externes
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Searchitem from "../../components/searchitem/Searchitem";

// Définition du composant fonctionnel List
const List = () => {
  // Utilisation du hook useLocation pour obtenir les données de la localisation courante
  const location = useLocation();

  // Utilisation du hook useState pour gérer l'état du composant
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  // Rendu du composant List
  return (
    <div>
      {/* Composant de barre de navigation */}
      <Navbar />

      {/* Composant d'en-tête avec un type spécifique */}
      <Header type="list" />

      {/* Conteneur principal du composant List */}
      <div className="listContainer">
        <div className="listWrapper">
          {/* Section de recherche avec des champs et options */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            {/* Champ de saisie pour la destination */}
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            {/* Champ de sélection de la date de check-in */}
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                // Composant externe pour la sélection de la plage de dates
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            {/* Section des options de recherche */}
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                {/* Différentes options comme le prix minimum et maximum */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                {/* Options pour le nombre d'adultes, d'enfants et de chambres */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>

            {/* Bouton de recherche */}
            <button>Search</button>
          </div>

          {/* Section des résultats de recherche avec des composants SearchItem répétés */}
          <div className="listResult">
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
            <Searchitem />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant List comme composant par défaut
export default List;
