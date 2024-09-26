import { replaceMongoIdInObject } from '~/lib/convert-data';

import AssessmentModel from '../models/assessment';
import ReportModel from '../models/report';

export async function getAReport(filter: { course: string; student: string }) {
  const report = await ReportModel.findOne(filter)
    .populate({
      path: 'quizAssessment',
      model: AssessmentModel,
    })
    .lean();

  if (report) {
    return replaceMongoIdInObject(report);
  }
}
