const semesters = [
  // Semester 1
  [
    { name: "Calculus I", credits: 3, grade: "A" },
    { name: "Introduction to Programming", credits: 4, grade: "B" },
    { name: "English Composition", credits: 2, grade: "P" },
    { name: "Physics I", credits: 3, grade: "C" },
  ],
  // Semester 2
  [
    { name: "Data Structures", credits: 3, grade: "A" },
    { name: "Linear Algebra", credits: 3, grade: "B" },
    { name: "History", credits: 2, grade: "D" },
    { name: "Chemistry", credits: 3, grade: "F" },
  ],
  // Semester 3
  [
    { name: "Algorithms", credits: 3, grade: "A" },
    { name: "Discrete Mathematics", credits: 3, grade: "B" },
    { name: "Computer Architecture", credits: 3, grade: "C" },
    { name: "Technical Writing", credits: 2, grade: "P" },
  ],
  // Semester 4
  [
    { name: "Operating Systems", credits: 3, grade: "B" },
    { name: "Database Systems", credits: 3, grade: "A" },
    { name: "Probability & Statistics", credits: 3, grade: "D" },
    { name: "Ethics in Technology", credits: 2, grade: "C" },
    { name: "Microeconomics", credits: 2, grade: "F" },
  ],
];

const gradePointsMap = {
  A: 5.0,
  B: 4.0,
  C: 3.0,
  D: 2.0,
  E: 1.0,
  F: 0.0,
  P: null, // Pass grades do not affect GPA
};

function calculateCGPA(semesters) {
  const units = semesters
    .flat()
    .map((course) => (course.grade === "P" ? 0 : course.credits))
    .reduce((a, b) => a + b, 0);
  const grades = semesters
    .flat()
    .map((course) =>
      gradePointsMap[course.grade]
        ? gradePointsMap[course.grade] * course.credits
        : 0,
    )
    .reduce((a, b) => a + b, 0);

  if (units === 0) {
    return 0;
  }

  return grades / units;
}

const cgpa = calculateCGPA(semesters);
console.log(`Cumulative GPA: ${cgpa.toFixed(2)}`);

const record = semesters
  .flat()
  .map((course) =>
    course.grade !== "P"
      ? {
          units: course.credits,
          points: course.credits * gradePointsMap[course.grade],
        }
      : undefined,
  )
  .filter((course) => course !== undefined)
  .reduce(
    (a, b) => ({ units: a.units + b.units, points: a.points + b.points }),
    { units: 0, points: 0 },
  );

const record_cgpa = record.points / record.units;

console.log(`FP derived Cumulative GPA: ${record_cgpa.toFixed(2)}`);

const gpas = semesters.flatMap((courses) =>
  courses
    .flat()
    .map((course) =>
      course.grade !== "P"
        ? {
            units: course.credits,
            points: course.credits * gradePointsMap[course.grade],
          }
        : undefined,
    )
    .filter((course) => course !== undefined)
    .reduce(
      (a, b) => ({ units: a.units + b.units, points: a.points + b.points }),
      { units: 0, points: 0 },
    ),
);

console.log(gpas);
