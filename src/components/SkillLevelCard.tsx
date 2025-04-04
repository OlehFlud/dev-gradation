import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Level } from "../utils/hierarchyData";

interface SkillLevelCardProps {
  level: Level;
  expandedLevel: string | null;
  setExpandedLevel: (id: string | null) => void;
}

export function SkillLevelCard({ level, expandedLevel, setExpandedLevel }: SkillLevelCardProps) {
  const isExpanded = expandedLevel === level.id;
  const colorStyle = level.id.startsWith('f') ? 'ring-blue-500' : 'ring-indigo-500';
  const buttonColor = level.id.startsWith('f') ? 'text-blue-600' : 'text-indigo-600';

  return (
    <Card
      className={`bg-white overflow-hidden shadow rounded-lg transition duration-200 
    hover:ring-2 hover:${colorStyle} hover:shadow-none shadow-md`}
    >
      {/* Card Header */}
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{level.title}</h3>
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Level {level.level}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${level.progressColor} rounded-full h-2.5 transition-all duration-500`}
              style={{ width: `${level.progress}%` }}
            />
          </div>
        </div>

        {/* Skills List */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Key Skills</h4>
          <ul className="mt-2 space-y-1">
            {level.skills.map((skill) => (
              <li key={skill} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtitles (if any) */}
        {level.subtitles && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500">Subcategories</h4>
            <ul className="mt-2 space-y-3">
              {level.subtitles.map((subtitle) => (
                <li key={subtitle.name}>
                  <div className="font-medium text-sm text-gray-800">{subtitle.name}</div>
                  <p className="text-xs text-gray-600 mt-1">{subtitle.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer */}
      {/*<div className="bg-gray-50 px-4 py-3 sm:px-6">*/}
      {/*  <Button*/}
      {/*    variant="link"*/}
      {/*    className={`text-sm font-medium ${buttonColor} hover:underline transition duration-150 ease-in-out`}*/}
      {/*    onClick={() => setExpandedLevel(isExpanded ? null : level.id)}*/}
      {/*  >*/}
      {/*    {isExpanded ? 'Collapse' : 'Expand'}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </Card>
  );
}
