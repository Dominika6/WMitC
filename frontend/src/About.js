import React, { useState } from "react";
import { Card } from "react-bootstrap";

const About = () => {
  const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <>
      {loggedUser?.result.position === "admin" ? (
        <>
          <h3>Hello {loggedUser.result.name.split(" ")[0]}! </h3>
          <br />
          <h4>Welcome to the Work Manegement In The Company Application.</h4>
          If you are here for the first time, please read the instructions
          below.
          <br /> <br />
          <Card>
            <Card.Body>
              <b>Jesteś administratorem tej aplikacji.</b>
              <br /> <br />
              Wypełniając formularz znajdujący się w zakładce 'Create User'
              stworzysz konta użytkowników.
              <br /> <br />
              W zakładce 'Create Client' dodasz profile klientów.
              <br /> <br />
              Aby edytować dane użytkowników lub klientów udaj się do
              odpowiedniej zakładki - 'Users' lub 'Clients'
              <br /> <br />
              W zakładce 'Account' zobaczysz swoje aktualne dane oraz zmienisz
              hasło.
              <br />
            </Card.Body>
          </Card>
        </>
      ) : loggedUser?.result.position === "manager" ? (
        <>
          {" "}
          <h3>Hello {loggedUser.result.name.split(" ")[0]}! </h3>
          <br />
          <h4>Welcome to the Work Manegement In The Company Application.</h4>
          If you are here for the first time, please read the instructions
          below.
          <br /> <br /> <br />
          <Card>
            <Card.Body>
              <b>
                Twoją rolą w systemie jest koordynowanie pracy swojego zespołu.
              </b>
              <br /> <br />
              W zakładce 'Create Project' utworzysz projekt. Po przejściu w
              'Create Task' stworzysz zadania.
              <br />
              <br />
              Aby wyświetlić listę swoich klientów przejdź do zakładki
              'Clients'. Analogicznie w zakładce 'Team' znajdziesz dane członków
              swojego zespołu.
              <br /> <br />
              W zakładce 'Tasks' przeglądniesz wszystkie aktualne zadania
              swojego zespołu. Po kliknięciu w konkretne zadanie przejdziesz w
              szczegóły. Istnieje możliwość dodania komentarza do aktualnie
              wykonywanego zadania. Każde zadanie możesz zarchiwizować, ale
              pamiętaj, że jest to operacja nieodwracalna.
              <br /> <br />
              W zakładce 'Summary' znajdują się podsumowania pracy Twojego
              zespołu. Ta sekcja podzielona jest na 3 podstrony 'Tasks',
              'Workers' i 'Clients', w których znajdują się odpowiednie tabele.
              Pod każdą z tabel znajduje się odnośnik umożliwiający pobranie
              wyświetlanych danych.
              <br /> <br />
              W zakładce 'Account' zobaczysz swoje aktualne dane oraz zmienisz
              hasło. W przypadku jakichkolwiek problemów z aplikacją skontaktuj
              się z administratorem, do którego email wyświetla się obok nazwy
              'Supervisor'.
              <br />
            </Card.Body>
          </Card>
        </>
      ) : loggedUser?.result.position === "user" ? (
        <>
          <h3>Hello {loggedUser.result.name.split(" ")[0]}! </h3>
          <br />
          <h4>Welcome to the Work Management In The Company Application.</h4>
          If you are here for the first time, please read the instructions
          below.
          <br /> <br />
          <Card>
            <Card.Body>
              W zakładce 'Tasks' znajdziesz listę swoich zadań. Po kliknięciu w
              konkretne zadanie przejdziesz w jego szczegóły. Znajdziesz tam
              wszystkie informacje niezbędne do jego wykonania. Aby utrzymywać
              aktualność danych o postępie realizacji zadań, po zakończonym dniu
              pracy wpisuj czas poświęcony na konkretne zadania oraz aktualizuj
              ich status.
              <br /> <br />
              W zakładce 'Team' masz dostęp do danych kontaktowych osób, z
              którymi jesteś w jednym zespole.
              <br /> <br />
              W zakładce 'Account' zobaczysz swoje aktualne dane oraz zmienisz
              hasło. W przypadku jakichkolwiek problemów z aplikacją skontaktuj
              się z przełożonym, do którego email wyświetla się obok nazwy
              'Supervisor'.
              <br />
            </Card.Body>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default About;
