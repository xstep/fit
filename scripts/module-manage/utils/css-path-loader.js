import fs from 'fs'

const parsePath = (filePath, info)=> {
    filePath = filePath.substring(2)
    let filePathArray = filePath.split('/')

    filePathArray.shift()
    filePathArray.shift()
    filePathArray.shift()
    filePathArray.shift()
    filePathArray.pop()

    // 第一个是空,说明是根路径,不处理
    if (filePathArray[0] === '') {
        return ''
    }
    
    const prefix = `fit-${info.categoryName}-${info.module.path}`
    const addonPath = filePathArray.join('-')
    return `${prefix}-${addonPath}`
}

export default (filePath, info) => {
    let source = fs.readFileSync(filePath).toString()

    // 对 fit-style 不做处理
    if (info.module.path !== 'style') {
        const name = parsePath(filePath, info)
        if (name !== '') {
            console.log('css:',name)
            source = `.${name}{${source}}`
            fs.writeFileSync(filePath, source)
        }
    }
}