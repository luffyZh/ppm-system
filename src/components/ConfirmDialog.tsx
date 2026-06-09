import type { PropsWithChildren } from 'react'

export function ConfirmDialog(
  props: PropsWithChildren<{
    open: boolean
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
  }>,
) {
  if (!props.open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#070a10]/95 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold tracking-wide text-zinc-100">
            {props.title}
          </div>
          {props.description && (
            <div className="mt-1 text-xs text-zinc-400">{props.description}</div>
          )}
        </div>

        <div className="px-5 py-4">{props.children}</div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={props.onCancel}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.04]"
          >
            {props.cancelText ?? '取消'}
          </button>
          <button
            type="button"
            onClick={props.onConfirm}
            className="rounded-xl border border-cyan-300/25 bg-cyan-400/15 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/20"
          >
            {props.confirmText ?? '确认'}
          </button>
        </div>
      </div>
    </div>
  )
}

