import { ReactElement } from "react";
import NavBar from "../Navigation/NavBar";
import Image from 'react-bootstrap/Image';

const NotFoundPage = (): ReactElement => {
    const catImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgYGBIRGBgYEhgYHBEYGBgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGBISGjQhISE0NDE0NDQ0NDQ0MTE0NDQ0NDQxMTQxNDQ0NDQxNDE0NDQxNDE0PzQ/NDE0ND80Pz8/P//AABEIAMkA+wMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAUGBwj/xAA/EAACAQIEBAMGAwUFCQAAAAABAgADEQQSITEFQVFxBmGBEyIykaGxQsHRBxRS4fAVcoKSohYjJDNissLS8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQADAAICAwEBAQAAAAAAAAABAhEDIRIxE0FRBBRh/9oADAMBAAIRAxEAPwDjTAJhGCZm1MYJhGCYAjBJjmCYyIwTHgkwLDRorxjAjRjHjSgYzMxO/wA5pNtM3EbyftUekEcGNFKSRjxRQEDSSDaRpJJEtCgg6wjAG8IKVi8eRFxBeqZaMTEwM8hLwc0AnzQc8iEJRAETFGtCAgqCtFHtFA8dKYMcxjIATBMIwTAGjGOTBMCMYJhQDKgEYMcwTERGNeOYJlEZtjM7E8uxmgdj2MzsR+Ht+cn7P6QxTT4FwZ8U5RWC5VLMxBIUXsBYbkn84uN8ErYVwtQAhrlHXVWtvbofIx7G4MnNZkUeNeMRKSnDEBIciVwcyIyQSNo4Bi0bWEBHlIkIWEI0UAe8QMe0cLFoiAwhFaFFqsNaPFFaPQ6IwIRgmSDGMTHMEwBjBMcmCYAoJiJjGVCZMY0ZnA3Mr1MSBtEWLBkbMBuZUfEE+XaRM8o8WnxA2HaU6x1HaCWiq8u0kTDs/wBmur1v7tL7tO84rw2niKRpVFJVtQRujDZlPUfynnn7Nq2XEsnJ6bX7qykfc/Oep06VxYSLR3q6z08Q41wWrhqhpuLjdWA92ov8Q8+o5TPVZ9Evwum65aiK43syg/KQ1fDuDZcrYakd/wAAB89RrInn8fcHHHvqXgCCHlnun+xuAsP+GQeYZrn1vIm8D4BRf2JJBvrUYg9wTrJnnqr45eN8N4ZVxDZaSFzzOyp/eY6CdnR8GUaFJ6uIb2jhWIQEqqtbQdW15/SdyuDRBZVCKPwqAo+k5/xZWIouDtlIABtMvmta0RHUNfCta7PcvI1WPaS5YiJ2a5sR5Y4EK0cLDRgbRWhWiywMEQh5Y4SABHtJMsWWLSbZgmEYJjATGMdjbeV6mKUba9oBLAdwNzaUnxbHbT6ys733MBi++KUbayu+JY+QlcvBLR6MOX1jFo0dUJiMEVpOtMc4/aPSRCnBdZMYxEWjGt4OaouLpmmuYklGHVSPe+Vr+k9xwlDIuu51M80/Zgq+0qMRqqKB6nX7CejOxuLnTptI5LYI76Xs5OggKdQDMLxLwiriKajD1xSIuXzFhcaEMrr7ysMvazGbHBC7KjPqVRVLHT2jAWLW5XOswnxtDWImqxn5SZDca7zI4tVrIjiigaqbZFJAzajNYtpe17XhcEbEmiHxSqlTUFQQSbc/d0F+k5pjqbfjfE3EqPuGw5GeN8b4nWYvScEAHVWOqnyM9uStmFiJyPjPwuK6GpTUe0X/AFr07yuHkr5J5KzjyK0a0nqUipIIsRoQYFp3RLnxHljhYRij0YYLGIjxRaDWjxRQ0FeNHj2geNCpi1Hn2/WVXxjHbT6ysTALRzJZiV3J1JvIi8EmMYxhEwTCCk8oa0esAihrSJ8pMABsIiDFoAEA845Yx8sa0PIYUGEFhZIpkAAhERwI9oB0/gDFBMTlJsHUr3tqPtPUXYsNDb0niHD3ZXVl0KkNfpaevcK4gtVFqUzcG2a41U+Qh7RMdtqjRzaNtzj18X7Ij3TkNgCOR6ESD98CjWVcTiazqMiWGZW986tY30XltvF41iOl8dpm0b3DcVDUUMylCDmXNa4722kDg89fWBheI30a4I3B0I/WT1q46Tg5KxMuqsiRRaIppBo3MsZbzHMlThPFvhVat3pgK++n4p5ni8K9NijqVYcjPoZsNeZXF/DVHEC1RLkbMNCPUTt4bzmS57x3sPB8sHLO/wCM/s/ZLtRfMP4WFiOx5zi8XgalNsroVPbfsZ07DNUtGhkRWgACPaHGtAFGtCtFli0KrGCZOuHY76SRaSjzjUqrTJky0RzkrE8oOXrFqTX6CNaHBtDQG8YtJFQmGlMQ08RKsILJ8sWWLRiG0e0myxHyj0YgIjBLmTMJGTDRiSkABrttbkBzv1/OdF4c4s1F0bMb1DlC8kQHKWI5uxWw6BDbcW5u0vUn/wB6vkUUdgAI4krQ9YrYvX3kseo5xjjdj0k9ShnVSOgkaYAN5xWrYVtWBJiVY3JA7mX6WJTa9+2sxTwxwbDUfbvNnh2Fy9+vWcnJSYlvW8SvYcEy/SpQKNO0t07CRWn6V7ddFkkTJLIF4DiaemWs3E0LictxbhytoUDDoRedpUWZmOw19fyj8leOvNcf4apN8PuHoNvrOV4jwipSOq3HJhtPWcRhbG8zMXhQwIIBHSbVtqJ2HlGWKdNxfgGW7Jew3HSc41O0uRE6GK0fLFJURuY2URExrReQwiYNoWWGqx6EeWOFkypCFOKZCJYarJQogMQIaCCxEQS8YPGBEQQI949o9ASIBWGxkbPFMg8dH971kZMdYRIex+GcUtTDoc2ZgAr+TDcWmstM3te155r4Cxy06pDtYOALE6X5GeolwbETeO4c9oycSU6fTXvLFMgEaStnsBrblbrHVyJleNVWcaimSqZTpVfOTCpOaYxturOYxpEryVTEWYjaQ1EuJOxgPFLSGTisPpOfxlEC9p1lWY+Lo3vp/KVS3ZWrsOcVOd730IM5fxLwhV99BbXVf0nZvSAO8qYxbqbgMNrGdTB5aYssu8UoBHIAsN7SpeQ0ga0vOL2cntEZDTEXs44WHaOEj0YC0QEkCCOViSitGySWMYHiLJGIEkYyIwGBMGSRo/ZYAiDaShI5WIYjCQskKMTHowVBspBHKet8A4galBH5gWNuo05zx+ekeAa+akyEg2NwNrDqZrWdhlev263DVS2p32A5gczJS418tyToJEaQtYbnpoT68hBWnyNiByt7oP8A5GEohao1v6MnWvrvKLLzJJ8h/W8h9tlOx+UyvDWroKbjrJ0eZGGrk8pdSoek59a5q2xkLHlHzSvWaxHyk2sqtRVLSliUlhnvyv25ekgqmZxbtWdMXF2B2HW8oV3UA5haX+Kiwzc9fWc/XqHUH07TupbpzWr25fj9JW94cjbSYOWdHxZRla3Oc7ljmTiFsrGKyxaMO0jya4iVDCyGT+kAxaMREQbyRhIysZYaWX4e4XMV87X1E1OBcODKajC5vZQeXnNsYbKGLRb2HBOI2WSVHBJI2uSPnGBlAISGFAjEwbwAiYLGOYJgAGNlhWj2gA2nXeAHPtmUbFbzk7Tvf2f4SyvUI5hB6an7zTj9suT07XJfQafcxEHYbCHRcGTmaTDHVfL1jvSuNCe15bVQRIXGWTavRxKtTqEG00aNTqZm59SZdwmvKcd476dVFoMOsgxL6diJJWUC197bTOxDXFiZz3nGtY1dU3kLNrIlracweR6iC1a1rbyPJpihxd1y3vqLXU8/MTkqtW5trpoO06njNIsC1tRp2nJVUIM7OG21c94yWZxbYzAtOh4onuGc7abTOIhqCnCCiOwMgepMY7bz0kJEFjK5qRFpXinUsdEuQJCLyWhUKsD0N4QUy63hTge7taWOKVboUB3Buel5Ww7I9mDWuNdYGKK7KbnqZWYiWEnBbnQzSw/hUtu1ptYCmqqL2Jmj7YCVGItM/TmqnhAcn+kr4jwi9vcdT5HSdb+8CL2wlbCNs4V/DGJGuVT2b9Ze4T4ExNcsboiqN3zat/DYD6zrUrCbfBGK07s7DM7OACNBfT52inM04tZ5Hxnw7iMM+SpTOuqsl2Vx5EfY2Mz2wrjdHH+Ez3muVrDKxHUH+EzExFN0bKy3HI2uDJpatlWm1fp4/wCxYfhb/KZ6v4ewvssNTT8RXM3kW1P3t6S5RpudkHyl2jhGGp3M3rEVY2tNkdGnYSRmIMn9laCy33jmSgC1bSriMX01tHr0jylApqZnay6xC0H2Ow+pmlgOupmNmFhv0mxg61ksP6+es579T22qOsdzMrEvrblYmXqlS+0yaoLs309N5w8k7PTs44XqNUgW/wDhh5hfUW/LvK1FDl0OwB7jYy2lO4uRtv5dYVjRbpDiPeBAPLUeXXtORxy5WI9J1eMTKt15ag9JyPFa92vz1uOs6+GMc/IxeKH3GnLZjNri+LuuW8wc4nTmsYdT7PygnDy4SBAzXnB547/CFF6Ehah5TUyXjigvOXHLiZ42P7MwvZzVZRsF9TAXDjnHHKU8agocfCxESGqPx37ibC0B0iOFHSV8sJniVKOKrL+If5f5yzSx1a99D6H9ZLTRRyk6i8n5/wAHwK78TrDYJ63kX9sVxuqnsxH5S8cODvK1bDryOsqOXUW4cC3H3XemfRhNfg/GfaIRlKsrX13ynYA3230nPvhTBSmyHMpynreXM+UZCYrFZel4HFg2685uYeqpGonmGA4wV+I2I5jYzewXiVBozXJ6fSYxW1ZaWy0O8UKdu8gq1BfUTCwnHEIvm2+sCpxPOfdnVE7Dlmnbbeop2tKeIYTPTFAC5N4LYsER10WrCw1YTPrHkNOcirYodZnPj7mw3+0cyK1aaEgG28ucPGliTMvhbl3IPQn5TYwNMrv1mHN6a09rFZABm5TLRsp8rfMk6yfxDjiiWG5IA9NTOfXHDQNqT/RnDaO+nbT06SiwuO3zvp+cnqOyG4GZeY58vyMw1xosATqDa/lyMkocSuWFzqCR9CD8vtKqm0JsTilIKBrGzAdxqB8vtOG4rWNyb6XPpNDjWPHx3swYj1U6zjeK8SJJsd528VXNySp4/E5j9JJhcOGUG29+fmZmE3m7w2ramug/F/3GdOYzhvZNI6U7eUMpYQkAbaeRM69LAqTyiZRJHBHKMogYI4kjpoPP69oJTW1+Wvl5CLcSJSbXtpt3ju9twYWX6QW6Rbp4BXXr89ITV8uwv5CCE/owrW5QjoSpVeIvf4behkDYqo3M+g/OaWWGF9Jr80RHplPHM/bJyVD19TaSJg3O9h6zVCiSKsj/AFT9QccEfcsz+zmI+IfIylW4PVv7rfQzplSGqA6AesP9Fz+GrmUwuMQaOst4evjUG6Hre4nQDDRLRFtppH9HJ/wvhqy14pX/ABU7j/pb9Y1XjzgW9mw9RNU0RAfChtwPlNK88/bO388T6Yp4u7bo30knCf3jEVBTpU9TqSzCyjq1thLdXhy9bTrPA9SlTplVKl2clz+KwtlHbea8fJ5zkMOTjmkal4NwCtRzNVZWY6DITYDnuL3mrTogby63EEB1IAsN/WZnF+K0kRmBBYDQBviPLaLmjI3Rx7M+nGePuIBKlNb3sjMfU2H2M45OMG5Nj02Ok6DF1DUcu+pPl8gJCuFHQfKckc1IjuHdHBP6yxxRyLnNqR+E7CWV4qyqGVWL7WKkaTSp4UDcST2IPISP9FYnqqvgn9cbxCrVcaqw39bzM/dH5/WegNQB85A+AQ7qJvX+2I6xhf8Aln6lzvAPC9TEuQpyoti7nZb8h1Y9J1Z8F20WothoLoxPrLPAUakrgWUF81lJ2sB5dJr/AL4/8T/5h/7S7f076lEcEx7hyzL1hr0GkY7iSr+s53UEJ1+cdkA1INuQ5sfPoJNT+JfWE/xehkTIVwOZ+I/6R0EFaNzfYczCTeTVfhij2coAg239YWWJP0kjf18oSSK/IRKhjrJWmc2lWIhR84eSStBO0ibSMABJkAEjSEu57mVU5Srcy0iecr095Y6d5ce0ynC2F7wSp7D79hAO4lur8Y9Jt9EhWnERfb5yZtjGb4RFAVWA26/WQ/uKPrl94HRlJXL2KnUw6u57GT8P3lR16HjE+1Srg3JHv1On/Mf5G+/rIE4blu2pHmSTb185uv8AGf8AD9zIq3wt2/MyOW0zHs6RET1DFFMCS00t06XhLue8J9x6zitLpNkEQQQmiWRshXdI/s5Kv5mO/OVqcPRcLuJN+8jpK1Tceslp7CIP/9k=";
    return (
        <>
            <NavBar />
            <div className="mt-5 py-5 d-flex flex-column align-items-center">
                <h1>Страница не найдена:(</h1>
                <Image src={catImage} />
            </div>
        </>   
    )
};

export default NotFoundPage;