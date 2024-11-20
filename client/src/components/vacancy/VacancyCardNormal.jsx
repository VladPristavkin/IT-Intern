// import React from "react";
// import "./VacancyCardNormal.css";
// import NoLogo from "../../assets/No-Company-Logo.svg";
// import JobLocation from "../../assets/Location-icon.svg";
// import JobSalary from "../../assets/Money-icon.svg";
// import JobPublishedAt from "../../assets/CalendarBlank.svg";
// import RussianFlag from "../../assets/Russia.svg";
// import BelorussianFlag from "../../assets/Belarus.svg";

// const VacancyCardNormal = ({ vacancy }) => {
//   const {
//     name,
//     description,
//     area,
//     address,
//     salary,
//     publishedAt,
//     employer,
//     country
//   } = vacancy;

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("ru-RU", options);
//   };

//   const getFlag = (countryName) => {
//     switch (countryName) {
//       case 'Россия':
//         return RussianFlag;
//       case 'Беларусь':
//         return BelorussianFlag;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="vacancy-card">
//       <div className="company-logo">
//         <img src={employer?.logoUrl || NoLogo} alt={employer?.name || "No Company Logo"} />
//       </div>
//       <div className="vacancy-main-content">
//         <div className="vacancy-header">
//           <h2 className="vacancy-title">{name || "Не указано"}</h2>
//           <p className="vacancy-company">{employer?.name || "Не указано"}</p>
//         </div>
//         <div className="vacancy-body">
//           <div className="vacancy-item">
//             <img src={JobLocation} alt="Location Icon" className="icon" />
//             <p className="vacancy-location">
//               {address?.city || "Не указано"}, {area?.name || "Не указано"}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobSalary} alt="Salary Icon" className="icon" />
//             <p className="vacancy-salary">
//               {salary?.from != null ? salary.from : "Не указано"}
//               {salary?.to != null ? ` - ${salary.to}` : ""} {salary?.currency || ""}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobPublishedAt} alt="Published At Icon" className="icon" />
//             <p className="vacancy-published">{publishedAt ? formatDate(publishedAt) : "Не указано"}</p>
//           </div>
//         </div>
//         <div className="vacancy-footer">
//           <p className="vacancy-description">{description || "Не указано"}</p>
//         </div>
//       </div>
//       {country?.name && (
//         <div className="vacancy-flag">
//           <img src={getFlag(country.name)} alt={`${country.name} Flag`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VacancyCardNormal;


// import React from "react";
// import "./VacancyCardNormal.css";
// // import NoLogo from "../../assets/No-Company-Logo.svg";
// import JobLocation from "../../assets/Location-icon.svg";
// import JobSalary from "../../assets/Money-icon.svg";
// import JobPublishedAt from "../../assets/CalendarBlank.svg";
// import RussianFlag from "../../assets/Russia.svg";
// import BelorussianFlag from "../../assets/Belarus.svg";

// const VacancyCardNormal = ({ vacancy }) => {
//   const {
//     name,
//     description,
//     area,
//     address,
//     salary,
//     publishedAt,
//     employer,
//     country
//   } = vacancy;

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("ru-RU", options);
//   };

//   const getFlag = (countryName) => {
//     switch (countryName) {
//       case 'Россия':
//         return RussianFlag;
//       case 'Беларусь':
//         return BelorussianFlag;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="vacancy-card">
//       {/* <div className="company-logo">
//         <img src={employer?.logoUrl || NoLogo} alt={employer?.name || "No Company Logo"} />
//       </div> */}
//       <div className="vacancy-main-content">
//         <div className="vacancy-header">
//           <h2 className="vacancy-title">{name || "Не указано"}</h2>
//           <p className="vacancy-company">{employer?.name || "Не указано"}</p>
//         </div>
//         <div className="vacancy-body">
//           <div className="vacancy-item">
//             <img src={JobLocation} alt="Location Icon" className="icon" />
//             <p className="vacancy-location">
//               {address?.city || "Не указано"}, {area?.name || "Не указано"}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobSalary} alt="Salary Icon" className="icon" />
//             <p className="vacancy-salary">
//               {salary?.from != null ? salary.from : "Не указано"}
//               {salary?.to != null ? ` - ${salary.to}` : ""} {salary?.currency || ""}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobPublishedAt} alt="Published At Icon" className="icon" />
//             <p className="vacancy-published">{publishedAt ? formatDate(publishedAt) : "Не указано"}</p>
//           </div>
//         </div>
//         <div className="vacancy-footer">
//           <p className="vacancy-description">{description || "Не указано"}</p>
//         </div>
//       </div>
//       {country?.name && (
//         <div className="vacancy-flag">
//           <img src={getFlag(country.name)} alt={`${country.name} Flag`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VacancyCardNormal;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./VacancyCardNormal.css";
// import JobLocation from "../../assets/Location-icon.svg";
// import JobSalary from "../../assets/Money-icon.svg";
// import JobPublishedAt from "../../assets/CalendarBlank.svg";
// import RussianFlag from "../../assets/Russia.svg";
// import BelorussianFlag from "../../assets/Belarus.svg";

// const VacancyCardNormal = ({ vacancy }) => {
//   const navigate = useNavigate();

//   const {
//     id,
//     name,
//     description,
//     area,
//     address,
//     salary,
//     publishedAt,
//     employer,
//     country
//   } = vacancy;

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("ru-RU", options);
//   };

//   const getFlag = (countryName) => {
//     switch (countryName) {
//       case 'Россия':
//         return RussianFlag;
//       case 'Беларусь':
//         return BelorussianFlag;
//       default:
//         return null;
//     }
//   };

//   const handleClick = () => {
//     navigate(`/vacancy/${id}`);
//   };

//   return (
//     <div className="vacancy-card" onClick={handleClick}>
//       <div className="vacancy-main-content">
//         <div className="vacancy-header">
//           <h2 className="vacancy-title">{name || "Не указано"}</h2>
//           <p className="vacancy-company">{employer?.name || "Не указано"}</p>
//         </div>
//         <div className="vacancy-body">
//           <div className="vacancy-item">
//             <img src={JobLocation} alt="Location Icon" className="icon" />
//             <p className="vacancy-location">
//               {address?.city || "Не указано"}, {area?.name || "Не указано"}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobSalary} alt="Salary Icon" className="icon" />
//             <p className="vacancy-salary">
//               {salary?.from != null ? salary.from : "Не указано"}
//               {salary?.to != null ? ` - ${salary.to}` : ""} {salary?.currency || ""}
//             </p>
//           </div>
//           <div className="vacancy-item">
//             <img src={JobPublishedAt} alt="Published At Icon" className="icon" />
//             <p className="vacancy-published">{publishedAt ? formatDate(publishedAt) : "Не указано"}</p>
//           </div>
//         </div>
//         <div className="vacancy-footer">
//           <p className="vacancy-description" >{description || "Не указано"}</p>
//         </div>
//       </div>
//       {country?.name && (
//         <div className="vacancy-flag">
//           <img src={getFlag(country.name)} alt={`${country.name} Flag`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VacancyCardNormal;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./VacancyCardNormal.css";
import { convert } from "html-to-text";
import JobLocation from "../../assets/Location-icon.svg";
import JobSalary from "../../assets/Money-icon.svg";
import JobPublishedAt from "../../assets/CalendarBlank.svg";
import RussianFlag from "../../assets/Russia.svg";
import BelorussianFlag from "../../assets/Belarus.svg";

const VacancyCardNormal = ({ vacancy }) => {
  const navigate = useNavigate();

  const {
    id,
    name,
    description,
    area,
    salary,
    publishedAt,
    employer,
    country,
  } = vacancy;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const getFlag = (countryName) => {
    switch (countryName) {
      case "Россия":
        return RussianFlag;
      case "Беларусь":
        return BelorussianFlag;
      default:
        return null;
    }
  };

  const handleClick = () => {
    navigate(`/vacancy/${id}`);
  };

  const plainText = convert(description || "Не указано", {
    wordwrap: false,
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", options: { ignoreHref: true } },
    ],
  });

  const truncateText = (text, lines) => {
    const words = text.split(" ");
    let result = "";
    let lineCount = 0;
    let charCount = 0;

    for (let word of words) {
      charCount += word.length + 1;
      if (charCount > 80 * (lineCount + 1)) {
        lineCount++;
        if (lineCount >= lines) break;
        result += "\n";
      }
      result += word + " ";
    }

    return result.trim() + (lineCount >= lines ? "..." : "");
  };

  const truncatedText = truncateText(plainText, 2);

  return (
    <div className="vacancy-card" onClick={handleClick}>
      <div className="vacancy-content">
        <div className="vacancy-main-content">
          <div className="vacancy-header">
            <h2 className="vacancy-title">{name || "Не указано"}</h2>
            <p className="vacancy-company">{employer?.name || "Не указано"}</p>
          </div>
          <div className="vacancy-body">
            <div className="vacancy-item">
              <img src={JobLocation} alt="Location Icon" className="icon" />
              <p className="vacancy-location">
                {/* {address?.city || "Не указано"},*/} {country.name},{" "}
                {area?.name || "Не указано"}
              </p>
            </div>
            <div className="vacancy-item">
              <img src={JobSalary} alt="Salary Icon" className="icon" />
              <p className="vacancy-salary">
                {salary?.from != null && salary.from !== 0
                  ? salary.to != null
                    ? `${salary.from} - ${salary.to}`
                    : salary.from
                  : salary?.to != null
                  ? salary.to
                  : "Не указано"}{" "}
                {salary?.currency || ""}
                {/* {salary?.from != null ? salary.from : "Не указано"}
                {salary?.to != null ? ` - ${salary.to}` : ""} {salary?.currency || ""} */}
              </p>
            </div>
            <div className="vacancy-item">
              <img
                src={JobPublishedAt}
                alt="Published At Icon"
                className="icon"
              />
              <p className="vacancy-published">
                {publishedAt ? formatDate(publishedAt) : "Не указано"}
              </p>
            </div>
          </div>
          <div className="vacancy-footer">
            <p className="vacancy-description">{truncatedText}</p>
          </div>
        </div>
        {country?.name && (
          <div className="vacancy-flag">
            <img src={getFlag(country.name)} alt={`${country.name} Flag`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VacancyCardNormal;


