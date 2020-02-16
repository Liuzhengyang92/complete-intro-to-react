import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

const SearchParams = () => {
  const [location, setLoation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown, setAnimal] = useDropdown(
    "Animal",
    "dog",
    ANIMALS
  );
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);
  const [modal, setModal] = useState(false);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    console.log("animals", animals);

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(
      ({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      }
      // error => console.error
    );
  }, [animal, setBreed, setBreeds]); //if given the empty array, the useEffect will only
  //run once. It will never run again.

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => setLoation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Darkblue</option>
            <option value="mediumorchid">Mediumorchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <button
        onClick={e => {
          e.preventDefault();
          setModal(!modal);
        }}
      >
        Modal
      </button>
      {modal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <button>Yes</button>
              <button
                onClick={e => {
                  e.preventDefault();
                  setModal(!modal);
                }}
              >
                No, I am a Monster!{" "}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
