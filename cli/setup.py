import setuptools

with open("../README.md") as fp:
    long_description = fp.read()

setuptools.setup(
    name="slipbox",
    version="0.15.3",
    author="Levi Gruspe",
    author_email="mail.levig@gmail.com",
    description="Static-site generator for Zettelkasten notes",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lggruspe/slipbox",
    packages=setuptools.find_packages(),
    package_data={
        "slipbox": ["data/frontend.js", "filters/*.lua", "*.sql", "data/*.html"
                    ]
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Environment :: Console",
    ],
    install_requires=["climates==0.0.3"],
    python_requires=">=3.8",
)
