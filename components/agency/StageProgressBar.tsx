interface StageProgressBarProps {
  currentStage: number
  stages: {
    name: string
    startedAt?: string | null
    completedAt?: string | null
  }[]
}

const defaultStages = [
  'Intake & Inspection',
  'Teardown',
  'Body & Structure',
  'Mechanical',
  'Electrical',
  'Interior',
  'Testing & QA',
  'Delivery Prep',
]

export default function StageProgressBar({ currentStage, stages }: StageProgressBarProps) {
  const stageList = stages.length > 0 ? stages : defaultStages.map((name, i) => ({
    name,
    startedAt: i < currentStage - 1 ? '2026-01-15' : null,
    completedAt: i < currentStage - 1 ? '2026-02-01' : null,
  }))

  return (
    <div className="w-full">
      {/* Desktop: horizontal progress dots */}
      <div className="hidden md:flex items-center w-full">
        {stageList.map((stage, index) => {
          const stageNum = index + 1
          const completed = stageNum < currentStage
          const active = stageNum === currentStage

          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  completed ? 'bg-green-500 text-white' :
                  active ? 'bg-[#003087] text-white ring-4 ring-[#003087]/20' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {completed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stageNum
                  )}
                </div>
                <div className={`text-xs mt-2 text-center max-w-[80px] font-medium ${
                  completed ? 'text-green-600' : active ? 'text-[#003087]' : 'text-gray-400'
                }`}>
                  {stage.name}
                </div>
                {stage.completedAt && (
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(stage.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                )}
                {active && !stage.completedAt && (
                  <div className="text-xs text-[#003087] font-bold mt-1">In Progress</div>
                )}
              </div>
              {index < stageList.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          )
        })}
      </div>
      {/* Mobile: vertical list */}
      <div className="md:hidden space-y-3">
        {stageList.map((stage, index) => {
          const stageNum = index + 1
          const completed = stageNum < currentStage
          const active = stageNum === currentStage

          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                completed ? 'bg-green-500 text-white' :
                active ? 'bg-[#003087] text-white' :
                'bg-gray-200 text-gray-400'
              }`}>
                {completed ? '✓' : stageNum}
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${active ? 'text-[#003087]' : completed ? 'text-green-700' : 'text-gray-400'}`}>
                  {stage.name}
                </div>
                {stage.completedAt && <div className="text-xs text-gray-400">Done {new Date(stage.completedAt).toLocaleDateString()}</div>}
                {active && <div className="text-xs text-[#003087] font-bold">Currently Here</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
