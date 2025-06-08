import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "../Styles/DevDesign.css";
import PageWrapper from "./PageWrapper";

const colors = [
  "#7cb5ec", // Blue
  "#434348", // Dark Gray
  "#90ed7d", // Green
  "#f7a35c", // Orange
  "#8085e9", // Purple
  "#f15c80", // Pink
  "#e4d354", // Yellow
  "#2b908f", // Teal
];

// Example Highcharts configuration
// Pie-Donut Chart Configuration
const chartOptions1 = {
  chart: {
    type: "pie",
  },
  title: {
    text: "Security Risks and Subcategories",
    align: "left",
  },
  subtitle: {
    text: "Overview of security risks and their detailed breakdown",
    align: "left",
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ["50%", "50%"],
    },
  },
  tooltip: {
    pointFormat: "<b>{point.name}</b>: {point.y}%",
  },
  series: [
    {
      name: "Risk Categories",
      data: [
        { name: "Critical", y: 40, color: colors[0] },
        { name: "High", y: 30, color: colors[1] },
        { name: "Medium", y: 20, color: colors[2] },
        { name: "Low", y: 10, color: colors[3] },
      ],
      size: "50%",
      dataLabels: {
        format: "<b>{point.name}</b>: {point.y}%",
        distance: -30,
      },
    },
    {
      name: "Subcategories",
      data: [
        {
          name: "SQL Injection",
          y: 15,
          color: Highcharts.color(colors[0]).brighten(0.1).get(),
        },
        {
          name: "XSS",
          y: 10,
          color: Highcharts.color(colors[0]).brighten(0.2).get(),
        },
        {
          name: "RCE",
          y: 15,
          color: Highcharts.color(colors[0]).brighten(0.3).get(),
        },
        {
          name: "Auth Bypass",
          y: 15,
          color: Highcharts.color(colors[1]).brighten(0.1).get(),
        },
        {
          name: "CSRF",
          y: 15,
          color: Highcharts.color(colors[1]).brighten(0.2).get(),
        },
        {
          name: "Misconfigurations",
          y: 10,
          color: Highcharts.color(colors[2]).brighten(0.1).get(),
        },
        {
          name: "Info Disclosure",
          y: 10,
          color: Highcharts.color(colors[2]).brighten(0.2).get(),
        },
        {
          name: "Outdated Libraries",
          y: 5,
          color: Highcharts.color(colors[3]).brighten(0.1).get(),
        },
        {
          name: "Best Practices",
          y: 5,
          color: Highcharts.color(colors[3]).brighten(0.2).get(),
        },
      ],
      size: "80%",
      innerSize: "60%",
      dataLabels: {
        format: "<b>{point.name}:</b> {point.y}%",
        filter: {
          property: "y",
          operator: ">",
          value: 1,
        },
      },
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400,
        },
        chartOptions: {
          series: [
            {},
            {
              dataLabels: {
                distance: 15,
                format: "{point.name}",
              },
            },
          ],
        },
      },
    ],
  },
};

// Spline with Irregular Time Data
const chartOptions2 = {
  chart: {
    type: "spline",
  },
  title: {
    text: "Irregular Time Data for Security Issues",
    align: "left",
  },
  subtitle: {
    text: "Tracked over time",
    align: "left",
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      month: "%e. %b", // Display only day and month
      year: "%b", // Display only the abbreviated month for years
    },
    title: {
      text: "Date",
    },
  },
  yAxis: {
    title: {
      text: "Issues Found",
    },
    min: 0,
  },
  tooltip: {
    headerFormat: "<b>{series.name}</b><br>",
    pointFormat: "{point.x:%e. %b}: {point.y} issues",
  },
  plotOptions: {
    series: {
      marker: {
        symbol: "circle",
        fillColor: "#FFFFFF",
        enabled: true,
        radius: 2.5,
        lineWidth: 1,
        lineColor: null,
      },
    },
  },
  colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9"], // Custom color scheme
  series: [
    {
      name: "Critical Issues",
      data: [
        [Date.UTC(2023, 0, 1), 5],
        [Date.UTC(2023, 0, 10), 8],
        [Date.UTC(2023, 1, 1), 7],
        [Date.UTC(2023, 2, 5), 10],
        [Date.UTC(2023, 3, 15), 12],
        [Date.UTC(2023, 4, 20), 18],
        [Date.UTC(2023, 5, 1), 20],
        [Date.UTC(2023, 5, 15), 25],
        [Date.UTC(2023, 6, 1), 28],
        [Date.UTC(2023, 6, 10), 30],
      ],
    },
    {
      name: "High Issues",
      data: [
        [Date.UTC(2023, 0, 5), 3],
        [Date.UTC(2023, 0, 12), 4],
        [Date.UTC(2023, 1, 1), 5],
        [Date.UTC(2023, 2, 10), 6],
        [Date.UTC(2023, 3, 20), 9],
        [Date.UTC(2023, 4, 15), 11],
        [Date.UTC(2023, 5, 10), 12],
        [Date.UTC(2023, 5, 25), 15],
        [Date.UTC(2023, 6, 5), 17],
      ],
    },
    {
      name: "Medium Issues",
      data: [
        [Date.UTC(2023, 0, 3), 8],
        [Date.UTC(2023, 0, 20), 9],
        [Date.UTC(2023, 1, 10), 10],
        [Date.UTC(2023, 2, 4), 11],
        [Date.UTC(2023, 3, 15), 12],
        [Date.UTC(2023, 4, 10), 15],
        [Date.UTC(2023, 5, 5), 18],
        [Date.UTC(2023, 5, 18), 20],
        [Date.UTC(2023, 6, 3), 22],
      ],
    },
  ],
};

const DevDesign: React.FC = () => {
  return (
    <PageWrapper>
      <div className="dev-design-page">
        <header className="spacer"></header>
        <main className="content">
          <section className="projects">
            <h2>Technical Projects</h2>
            <p>
              During my time at AttackIQ, I engineered functionality for an
              internally managed Highcharts server, designed to dynamically
              process data from security tests and generate customized,
              insightful visualizations. This solution empowered users to
              effortlessly analyze test results through intuitive, dynamic
              charts. Additionally, I developed a robust class framework that
              streamlined chart generation, enabling future engineers to create
              fully customized visualizations by simply inputting a few key
              variables, with the framework seamlessly managing all underlying
              complexities.
            </p>
            <div className="charts">
              <div className="chart-container">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions1}
                />
              </div>
              <div className="chart-container">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions2}
                />
              </div>
            </div>
          </section>
          <section className="experience">
            <h2>Professional Experience</h2>
            <div className="experience-item">
              <h3>AttackIQ - Software Engineering Intern</h3>
              <p>03/2024 - 09/2024</p>
              <ul>
                <li>
                  Contributed to front-end development for AttackIQ's FLEX
                  platform, refining visuals, streamlining report generation,
                  and designing intuitive data access methods.
                </li>
                <li>
                  Spearheaded a new charting library for consistent, clear
                  reporting, simplifying data visualization and future design
                  iterations.
                </li>
              </ul>
            </div>
            <div className="experience-item">
              <h3>Cisco Systems, Inc. - Intern</h3>
              <p>San Jose, CA (06/2017 - 08/2018)</p>
              <ul>
                <li>
                  Designed and developed internal tools improving project
                  coordination and team operations.
                </li>
                <li>
                  Authored data analysis-focused reports and internal websites,
                  providing strategic insights.
                </li>
              </ul>
            </div>
          </section>
          <section className="education">
            <h2>Education</h2>
            <div className="education-item">
              <h3>Stanford University</h3>
              <p>Graduate Certificate in Computer Science</p>
              <ul>
                <li>
                  Specialized in core computer science disciplines, including
                  computing theory, combinatorics, and algorithm analysis.
                </li>
                <li>
                  Explored advanced topics such as discrete data models, finite
                  automata, and their practical applications in computational
                  problem-solving.
                </li>
                <li>
                  Gained a deep mathematical foundation to support research and
                  innovative software development.
                </li>
              </ul>
            </div>
            <div className="education-item">
              <h3>University of California, Santa Barbara (UCSB)</h3>
              <p>Bachelor of Fine Arts: Theater (06/2022)</p>
              <ul>
                <li>
                  Completed extensive coursework in Computer Science, including
                  Intermediate Python Programming, Introduction to Data Science,
                  and Object-Oriented Design and Implementation.
                </li>
                <li>
                  Developed a unique perspective as a front-end designer,
                  leveraging my theater background to create user experiences
                  that emphasize storytelling, visual composition, and audience
                  engagement.
                </li>
                <li>
                  Built a strong computational foundation, combining technical
                  skills with creativity, to support future graduate-level
                  learning and interdisciplinary applications.
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default DevDesign;
