import { FC, MouseEvent, PropsWithChildren } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

export const CopyContent: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const [_, copy] = useCopyToClipboard()

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    const target = event.target as HTMLElement
    const text = target.textContent || ''

    copy(text)
      .then(() => {
        figma?.notify('Copied to clipboard')
      })
      .catch((error: any) => {
        figma?.notify('Failed to copy!', {
          error: true,
        })
      })
  }

  return (
    <div
      onClick={handleClick}
      className="shrink-0 max-w-30 truncate px-1.25 py-.5 border-border border-1 border-solid rounded-sm bg-$color-bg-secondary hover:bg-$color-bg-tertiary"
    >
      {children}
    </div>
  )
}
