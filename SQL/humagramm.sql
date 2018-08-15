-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 15. Aug 2018 um 08:37
-- Server-Version: 5.7.23-0ubuntu0.18.04.1
-- PHP-Version: 7.2.7-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `humagramm`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_human_IN_orga`
--

CREATE TABLE `zz_human_IN_orga` (
  `orgaID` int(10) NOT NULL COMMENT 'die id des menschen ',
  `humanID` int(10) NOT NULL COMMENT 'die id des '
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_human_IN_proj`
--

CREATE TABLE `zz_human_IN_proj` (
  `humanID` int(10) NOT NULL COMMENT 'id des menschen',
  `projID` int(10) NOT NULL COMMENT 'id des projektes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_menschen`
--

CREATE TABLE `zz_menschen` (
  `id` int(10) NOT NULL COMMENT 'id',
  `titel` varchar(20) DEFAULT NULL COMMENT 'dr, prof titel eben',
  `gender` varchar(10) NOT NULL COMMENT 'geschlecht eintragen',
  `vorname` varchar(50) NOT NULL,
  `nachname` varchar(50) NOT NULL,
  `ort` varchar(30) NOT NULL,
  `plz` varchar(7) DEFAULT NULL,
  `strasse_nr` varchar(100) DEFAULT NULL,
  `adresse2` varchar(255) DEFAULT NULL,
  `bundesland` varchar(40) DEFAULT NULL COMMENT 'bundesland',
  `land` varchar(30) DEFAULT NULL COMMENT 'aus welchem land kommt der Mensch',
  `e-mail1` varchar(120) DEFAULT NULL,
  `e-mail2` varchar(120) DEFAULT NULL,
  `tel1` varchar(30) DEFAULT NULL,
  `tel2` varchar(30) DEFAULT NULL,
  `www1` varchar(120) DEFAULT NULL,
  `www2` varchar(120) DEFAULT NULL,
  `dates` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'datum der anmeldung',
  `zusatz` text,
  `youtube` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `google` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `img` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_orgas`
--

CREATE TABLE `zz_orgas` (
  `id` int(11) NOT NULL,
  `name` varchar(254) NOT NULL COMMENT 'name der organisation',
  `orgatyp` varchar(30) NOT NULL COMMENT 'verein, patei, bewegung, typ der orga',
  `plz` varchar(8) DEFAULT NULL COMMENT 'sitz  der organisation',
  `ort` varchar(100) NOT NULL COMMENT 'sitz  der organisation',
  `str_nr` varchar(120) DEFAULT NULL COMMENT 'sitz  der organisation',
  `adresse2` varchar(255) DEFAULT NULL COMMENT 'sitz  der organisation',
  `bundesland` varchar(50) DEFAULT NULL COMMENT 'sitz  der organisation',
  `land` varchar(50) DEFAULT NULL COMMENT 'sitz  der organisation',
  `email1` varchar(100) DEFAULT NULL COMMENT 'email der orga',
  `email2` varchar(100) DEFAULT NULL COMMENT 'email der orga',
  `tel1` varchar(50) DEFAULT NULL COMMENT 'tel der orga',
  `tel2` varchar(50) DEFAULT NULL COMMENT 'tel der orga',
  `ansprech` varchar(120) DEFAULT NULL COMMENT 'ansprechpartner  der orga',
  `zusatz` mediumtext COMMENT 'alles was nic wichtig ist ',
  `img` varchar(60) DEFAULT NULL COMMENT 'logo der orga',
  `dates` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'wann wurde die orga angelegt',
  `www1` varchar(120) DEFAULT NULL,
  `www2` varchar(120) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `youtube` varchar(100) DEFAULT NULL,
  `google` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_orga_IN_proj`
--

CREATE TABLE `zz_orga_IN_proj` (
  `orgaID` int(10) NOT NULL COMMENT 'die id der organisation',
  `projID` int(10) NOT NULL COMMENT 'die id des projektes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_projects`
--

CREATE TABLE `zz_projects` (
  `id` int(8) NOT NULL,
  `name` varchar(120) NOT NULL,
  `descs` text COMMENT 'beschreibung des projekts',
  `plz` varchar(8) NOT NULL,
  `ort` varchar(50) NOT NULL,
  `str_nr` varchar(120) DEFAULT NULL,
  `adresse2` varchar(255) DEFAULT NULL,
  `bundesland` varchar(50) DEFAULT NULL,
  `land` varchar(50) DEFAULT NULL,
  `ansprech` varchar(120) DEFAULT NULL,
  `email1` varchar(120) DEFAULT NULL,
  `email2` varchar(120) DEFAULT NULL,
  `tel1` varchar(50) DEFAULT NULL,
  `tel2` varchar(50) DEFAULT NULL,
  `zusatz` mediumtext,
  `img` varchar(60) DEFAULT NULL,
  `www1` varchar(120) NOT NULL,
  `www2` varchar(120) NOT NULL,
  `dates` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `youtube` varchar(100) DEFAULT NULL,
  `google` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zz_user`
--

CREATE TABLE `zz_user` (
  `id` int(10) NOT NULL COMMENT 'id',
  `uname` varchar(100) NOT NULL COMMENT 'userna fpr hmangramm',
  `passwort` varchar(20) NOT NULL COMMENT 'passwort des users',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'date der anmeldung'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `zz_menschen`
--
ALTER TABLE `zz_menschen`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `zz_orgas`
--
ALTER TABLE `zz_orgas`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `zz_projects`
--
ALTER TABLE `zz_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `zz_user`
--
ALTER TABLE `zz_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `zz_menschen`
--
ALTER TABLE `zz_menschen`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `zz_orgas`
--
ALTER TABLE `zz_orgas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `zz_projects`
--
ALTER TABLE `zz_projects`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `zz_user`
--
ALTER TABLE `zz_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
