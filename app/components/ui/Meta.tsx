import Head from "next/head"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"

interface ISeo {
    title: string
    description?: string
    image?: string
}

export const titleMerge = (title: string) => `${title} | Amazon`

const Meta: FC<PropsWithChildren<ISeo>> = ({ title, description, image, children }) => {
    const { asPath } = useRouter()
    const currentUrl = `${process.env.APP_URL}${asPath}`

    return (
        <>
            <Head>
                <title itemProp="headline">
                    {titleMerge(title)}
                </title>
                {description
                    ? (
                        <>
                            <meta
                                itemProp="description"
                                name="description"
                                content={description}
                            />
                            <link ref="canonical" href={currentUrl} />
                            <meta property="og:locale" content="en" />
                            <meta property="og:title" content={titleMerge(title)} />
                            <meta property="og:url" content={currentUrl} />
                            <meta property="og:image" content={image || 'favicon.ico'} />
                            <meta property="og:description" content={description} />
                        </>
                    )
                    : (
                        <meta name="robots" content="noindex, nofollow" />
                    )
                }
            </Head>
            {children}
        </>
    )
}

export default Meta
