import { replaceMongoIdInObject } from '~/lib/convert-data';

import AssessmentModel from '../models/assessment';
import ReportModel from '../models/report';

export async function getAReport(filter: { course: string; student: string }) {
  try {
    const report = await ReportModel.findOne(filter)
      .populate({
        path: 'quizAssessment',
        model: AssessmentModel,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}
