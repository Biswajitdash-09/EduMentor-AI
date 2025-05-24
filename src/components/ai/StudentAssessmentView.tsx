
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Play, Clock } from 'lucide-react';
import { Assessment } from '@/types/assessment';

interface StudentAssessmentViewProps {
  assessments: Assessment[];
}

const StudentAssessmentView: React.FC<StudentAssessmentViewProps> = ({ assessments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-edu-blue" />
          Available Assessments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {assessments.filter(a => a.status === 'published').map((assessment) => (
            <Card key={assessment.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{assessment.title}</h3>
                    <p className="text-sm text-gray-600">{assessment.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{assessment.subject}</Badge>
                      <Badge variant="secondary">{assessment.difficulty}</Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {assessment.duration} min
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-edu-blue hover:bg-edu-blue-dark">
                    <Play className="h-4 w-4 mr-2" />
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentAssessmentView;
