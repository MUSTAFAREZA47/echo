import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'

interface InfiniteScrollTriggerProps {
    canLoadMore: boolean
    isLoadingMore: boolean
    onLoadMore: () => void
    loadMoretext?: string
    noMoreText?: string
    className?: string
    ref?: React.Ref<HTMLDivElement>
}

export const InfiniteScrollTrigger = ({
    canLoadMore,
    isLoadingMore,
    onLoadMore,
    loadMoretext = 'Load more',
    noMoreText = 'No more items',
    className,
    ref,
}: InfiniteScrollTriggerProps) => {
    let text = loadMoretext
    if (isLoadingMore) {
        text = 'Loading...'
    } else if (!canLoadMore) {
        text = noMoreText
    }

    return (
        <div
            className={cn('flex w-full justify-center py-2', className)}
            ref={ref}
        >
            <Button
                variant="ghost"
                size="sm"
                onClick={onLoadMore}
                disabled={isLoadingMore || !canLoadMore}
            >
                {text}
            </Button>
        </div>
    )
}
