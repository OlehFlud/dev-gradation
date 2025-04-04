import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pathData, type PathSegment } from "../utils/hierarchyData";

export function DeveloperPathOverview() {
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Developer Path Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          This visualization shows the progression path for developers in both Frontend and Backend tracks.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-2">Frontend (React)</h3>
            <div className="relative">
              <div className="overflow-hidden h-8 text-xs flex rounded bg-gray-200">
                {pathData.frontend.map((segment, index) => (
                  <RenderPathSegment
                    key={index}
                    segment={segment}
                    isFirst={index === 0}
                    isLast={index === pathData.frontend.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-800 mb-2">Backend (Node.js)</h3>
            <div className="relative">
              <div className="overflow-hidden h-8 text-xs flex rounded bg-gray-200">
                {pathData.backend.map((segment, index) => (
                  <RenderPathSegment
                    key={index}
                    segment={segment}
                    isFirst={index === 0}
                    isLast={index === pathData.backend.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

interface RenderPathSegmentProps {
  segment: PathSegment;
  isFirst: boolean;
  isLast: boolean;
}

function RenderPathSegment({ segment, isFirst, isLast }: RenderPathSegmentProps) {
  const borderClass = `${isFirst ? 'rounded-l-sm' : ''} ${isLast ? 'rounded-r-sm' : ''}`;

  return (
    <div
      className={`${segment.color} ${segment.textColor} text-xs font-medium text-center p-1.5 leading-none ${borderClass}`}
      style={{ width: segment.width }}
    >
      {segment.name}
    </div>
  );
}
