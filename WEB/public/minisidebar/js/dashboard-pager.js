function removeTrailingSlash(link){
    if(!link.endsWith("/")) return link
    return link.substring(0, link.length - 1)
}

const router = new silkrouter.Router()
const route = silkrouter.operators.route
const templates = document.querySelectorAll('template')
const templateMap = new Map()
templates.forEach((template) => {
    const link = removeTrailingSlash(template.dataset.route)
    templateMap.set(link, template)
})
router.subscribe(({route}) => {
    const sanitizedRoute = removeTrailingSlash(route)
    const template = templateMap.get(sanitizedRoute)

    if (!template) return
    
    const matchedPage = document.importNode(template.content, true)
    const mountPoint = document.querySelector("#mount-point")
    $(mountPoint).children().detach()
    mountPoint.appendChild(matchedPage)
})


$("#sidebarnav").find("li > a").on("click", function(e){
    e.preventDefault()
    const link = removeTrailingSlash( $(this).attr("href") )
    router.set(link)
})
