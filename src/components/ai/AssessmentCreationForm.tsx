
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Assessment } from '@/types/assessment';

interface AssessmentCreationFormProps {
  newAssessment: Partial<Assessment>;
  onAssessmentChange: (assessment: Partial<Assessment>) => void;
}

const AssessmentCreationForm: React.FC<AssessmentCreationFormProps> = ({
  newAssessment,
  onAssessmentChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assessment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={newAssessment.title || ''}
            onChange={(e) => onAssessmentChange({ ...newAssessment, title: e.target.value })}
            placeholder="Enter assessment title"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={newAssessment.description || ''}
            onChange={(e) => onAssessmentChange({ ...newAssessment, description: e.target.value })}
            placeholder="Enter assessment description"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subject</label>
          <Input
            value={newAssessment.subject || ''}
            onChange={(e) => onAssessmentChange({ ...newAssessment, subject: e.target.value })}
            placeholder="e.g., Machine Learning, Calculus"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Difficulty</label>
            <Select
              value={newAssessment.difficulty || 'medium'}
              onValueChange={(value) => onAssessmentChange({ ...newAssessment, difficulty: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              type="number"
              value={newAssessment.duration || 60}
              onChange={(e) => onAssessmentChange({ ...newAssessment, duration: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentCreationForm;
