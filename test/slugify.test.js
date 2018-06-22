'use strict'

const { expect } = require('chai')
const slugify = require('../slugify')

describe('loopback-ds-slugify-mixin', () => {
  it('should be a function', done => {
    expect(slugify).to.be.a('function')
    done()
  })

  it('should call Model observe callback', done => {
    const ctx = {}
    const Model = {
      observe: (hook, cb) => cb(ctx, done)
    }
    slugify(Model)
  })

  it('should slugify newIstance', done => {
    const ctx = {
      isNewInstance: true,
      instance: {
        title: 'lorem ipsum'
      }
    }
    const expected = {
      isNewInstance: true,
      instance: { title: 'lorem ipsum', slug: 'lorem-ipsum' }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: 'title'
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

  it('should not slugify newIstance = false', done => {
    const ctx = {
      isNewInstance: false,
      instance: {
        title: 'lorem ipsum'
      }
    }
    const expected = {
      isNewInstance: false,
      instance: { title: 'lorem ipsum' }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: 'title'
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

  it('should slugify newIstance in a custom fied', done => {
    const ctx = {
      isNewInstance: true,
      instance: {
        title: 'lorem ipsum'
      }
    }
    const expected = {
      isNewInstance: true,
      instance: { title: 'lorem ipsum', titleSlug: 'lorem-ipsum' }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: 'title',
      slugifiedField: 'titleSlug'
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

  it('should slugify newIstance with a custom nested fied', done => {
    const ctx = {
      isNewInstance: true,
      instance: {
        post: {
          author: {
            name: 'John Drive'
          }
        }
      }
    }
    const expected = {
      isNewInstance: true,
      instance: { slug: 'john-drive', post: { author: { name: 'John Drive' } } }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: 'post.author.name',
      slugifiedField: 'slug',
      slugifyOptions: { 'lower': true }
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

  it('should slugify newIstance in a custom nested fied', done => {
    const ctx = {
      isNewInstance: true,
      instance: {
        post: {
          author: {
            name: 'John Drive'
          }
        }
      }
    }
    const expected = {
      isNewInstance: true,
      instance: {
        post: {
          foo: [
            {
              bar: {
                slug: 'john-drive'
              }
            }
          ],
          author: { name: 'John Drive' }
        }
      }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: 'post.author.name',
      slugifiedField: 'post.foo[0].bar.slug',
      slugifyOptions: { 'lower': true }
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

  it('should NOT slugify if field doesn\'t exists', done => {
    const ctx = {
      isNewInstance: true,
      instance: { title: 'title' }
    }
    const expected = {
      isNewInstance: true,
      instance: { title: 'title' }
    }
    const next = () => {
      expect(ctx).to.be.deep.eq(expected)
      done()
    }
    const cb = (hook, cb) => cb(ctx, next)
    const options = {
      fieldToSlugify: { something: 'not exists' },
      slugifiedField: { something: 'not exists' },
      slugifyOptions: { 'lower': true }
    }
    const Model = {
      observe: cb
    }
    slugify(Model, options)
  })

})