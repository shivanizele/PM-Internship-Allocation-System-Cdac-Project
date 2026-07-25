export function isStudentProfileComplete(student) {
    if (typeof student?.profileComplete === "boolean") {
        return student.profileComplete;
    }

    const qualification = student?.qualification || {};

    return Boolean(
        student?.collegeName &&
        student?.branch &&
        student?.cgpa > 0 &&
        student?.location &&
        Array.isArray(student?.skills) &&
        student.skills.length > 0 &&
        qualification.highestQualification &&
        qualification.degree &&
        qualification.specialization &&
        qualification.collegeOrUniversity &&
        qualification.passingYear &&
        qualification.percentageOrCgpa &&
        qualification.tenthPercentage &&
        qualification.twelfthOrDiplomaPercentage
    );
}
