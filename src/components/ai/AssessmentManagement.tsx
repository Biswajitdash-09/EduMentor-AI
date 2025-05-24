
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3, Users } from 'lucide-react';
import { Assessment } from '@/types/assessment';

interface AssessmentManagementProps {
  assessments: Assessment[];
}

const AssessmentManagement: React.FC<AssessmentManagementProps> = ({ assessments }) => {
  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <Card key={assessment.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{assessment.title}</h3>
                <p className="text-sm text-gray-600">{assessment.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{assessment.subject}</Badge>
                  <Badge 
                    variant={assessment.status === 'published' ? 'default' : 'secondary'}
                  >
                    {assessment.status}
                  </Badge>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    {assessment.submissionsCount} submissions
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  View Stats
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentManagement;
